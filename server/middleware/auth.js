import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';

export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ansari_luxury_secret_key_2026_modern_craft');
      
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          wishlist: true,
          addresses: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return res.status(401).json({ message: 'User not found or token expired' });
      }

      req.user = { ...user, _id: user.id };
      return next();
    } catch (error) {
      console.error('Auth verification failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as an administrator' });
  }
};

export const optionalAuth = async (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'ansari_luxury_secret_key_2026_modern_craft');
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          phone: true,
          wishlist: true,
          addresses: true,
        },
      });
      if (user) {
        req.user = { ...user, _id: user.id };
      }
    } catch (error) {
      // ignore optional auth token errors
    }
  }
  next();
};
