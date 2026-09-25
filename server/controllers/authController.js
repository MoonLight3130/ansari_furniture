import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'ansari_luxury_secret_key_2026_modern_craft', {
    expiresIn: '30d',
  });
};

const normalizeUser = (user) => {
  if (!user) return null;
  const { password, ...safeUser } = user;
  return {
    ...safeUser,
    _id: user.id,
  };
};

export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const userExists = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        phone: phone || '',
      },
      include: {
        addresses: true,
      },
    });

    const safeUser = normalizeUser(user);
    res.status(201).json({
      ...safeUser,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error('register error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: { addresses: true },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const safeUser = normalizeUser(user);
      res.json({
        ...safeUser,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('login error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: {
        addresses: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(normalizeUser(user));
  } catch (error) {
    console.error('getMe error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const updateData = {};
    if (req.body.name) updateData.name = req.body.name;
    if (req.body.phone !== undefined) updateData.phone = req.body.phone;
    if (req.body.password) {
      updateData.password = await bcrypt.hash(req.body.password, 10);
    }

    // Update user record
    await prisma.user.update({
      where: { id: req.user.id },
      data: updateData,
    });

    // Update addresses if provided
    if (Array.isArray(req.body.addresses)) {
      await prisma.address.deleteMany({ where: { userId: req.user.id } });
      if (req.body.addresses.length > 0) {
        await prisma.address.createMany({
          data: req.body.addresses.map((addr) => ({
            userId: req.user.id,
            fullName: addr.fullName || user.name,
            phone: addr.phone || user.phone || '',
            street: addr.street || '',
            city: addr.city || '',
            state: addr.state || '',
            pincode: addr.pincode || '',
            isDefault: Boolean(addr.isDefault),
          })),
        });
      }
    }

    const updatedUser = await prisma.user.findUnique({
      where: { id: req.user.id },
      include: { addresses: true },
    });

    const safeUser = normalizeUser(updatedUser);
    res.json({
      ...safeUser,
      token: generateToken(updatedUser.id),
    });
  } catch (error) {
    console.error('updateProfile error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    let currentWishlist = Array.isArray(user.wishlist) ? [...user.wishlist] : [];
    const index = currentWishlist.indexOf(productId);
    let action = '';

    if (index > -1) {
      currentWishlist.splice(index, 1);
      action = 'removed';
    } else {
      currentWishlist.push(productId);
      action = 'added';
    }

    const updated = await prisma.user.update({
      where: { id: req.user.id },
      data: { wishlist: currentWishlist },
      select: { wishlist: true },
    });

    res.json({ action, wishlist: updated.wishlist });
  } catch (error) {
    console.error('toggleWishlist error:', error);
    res.status(500).json({ message: error.message });
  }
};
