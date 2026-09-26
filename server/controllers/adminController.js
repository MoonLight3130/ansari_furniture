import prisma from '../config/prisma.js';

export const getAnalytics = async (req, res) => {
  try {
    const [totalProducts, totalOrders, totalUsers, totalSubscribers, orders, lowStockProducts, recentOrders] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.user.count({ where: { role: 'customer' } }),
      prisma.newsletterSubscriber.count(),
      prisma.order.findMany({ select: { total: true, status: true } }),
      prisma.product.findMany({ where: { stock: { lte: 5 } }, take: 5 }),
      prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 6,
        include: { items: true },
      }),
    ]);

    const totalSales = orders.reduce((acc, order) => acc + (order.total || 0), 0);

    const statusCountsMap = {};
    for (const ord of orders) {
      statusCountsMap[ord.status] = (statusCountsMap[ord.status] || 0) + 1;
    }
    const statusCounts = Object.entries(statusCountsMap).map(([_id, count]) => ({ _id, count }));

    res.json({
      totalSales,
      totalOrders,
      totalProducts,
      totalUsers,
      totalSubscribers,
      lowStockCount: lowStockProducts.length,
      lowStockProducts: lowStockProducts.map((p) => ({ ...p, _id: p.id })),
      recentOrders: recentOrders.map((o) => ({ ...o, _id: o.id })),
      statusCounts,
    });
  } catch (error) {
    console.error('getAnalytics error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getAdminProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(products.map((p) => ({ ...p, _id: p.id })));
  } catch (error) {
    console.error('getAdminProducts error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, room, collectionName, images, stock, material, compareAtPrice, dimensions, colors, features, tags, badge } = req.body;
    if (!name || !price || !category || !room) {
      return res.status(400).json({ message: 'Name, price, category, and room are required' });
    }

    const slugBase = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const slug = `${slugBase}-${Date.now().toString().slice(-4)}`;

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || '',
        price: Number(price),
        compareAtPrice: compareAtPrice ? Number(compareAtPrice) : null,
        category,
        room,
        collectionName: collectionName || 'Milano Collection',
        images: images && images.length ? images : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'],
        stock: stock !== undefined ? Number(stock) : 20,
        material: material || 'Solid Teak Wood',
        dimensions: dimensions || null,
        colors: colors || null,
        features: features || [],
        tags: tags || [],
        badge: badge || null,
      },
    });

    res.status(201).json({ ...product, _id: product.id });
  } catch (error) {
    console.error('createProduct error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData.id;
    delete updateData._id;

    if (updateData.price) updateData.price = Number(updateData.price);
    if (updateData.stock !== undefined) updateData.stock = Number(updateData.stock);

    const product = await prisma.product.update({
      where: { id },
      data: updateData,
    });

    res.json({ ...product, _id: product.id });
  } catch (error) {
    console.error('updateProduct error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id },
    });
    res.json({ message: 'Product successfully removed' });
  } catch (error) {
    console.error('deleteProduct error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getAdminOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      include: { items: true },
    });
    res.json(orders.map((o) => ({ ...o, _id: o.id })));
  } catch (error) {
    console.error('getAdminOrders error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingCode } = req.body;
    const data = {};
    if (status) data.status = status;
    if (trackingCode !== undefined) data.trackingCode = trackingCode;

    const updated = await prisma.order.update({
      where: { id: req.params.id },
      data,
      include: { items: true },
    });

    res.json({ ...updated, _id: updated.id });
  } catch (error) {
    console.error('updateOrderStatus error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getAdminUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        createdAt: true,
        updatedAt: true,
        addresses: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(users.map((u) => ({ ...u, _id: u.id })));
  } catch (error) {
    console.error('getAdminUsers error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getAdminSubscribers = async (req, res) => {
  try {
    const { search, status } = req.query;
    const where = {};

    if (search) {
      where.email = { contains: search, mode: 'insensitive' };
    }

    if (status && status !== 'all') {
      where.status = status;
    }

    const subscribers = await prisma.newsletterSubscriber.findMany({
      where,
      orderBy: { subscribedAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            phone: true,
          },
        },
      },
    });

    res.json(
      subscribers.map((s) => ({
        ...s,
        _id: s.id,
        isGuest: !s.userId,
        user: s.user || null,
      }))
    );
  } catch (error) {
    console.error('getAdminSubscribers error:', error);
    res.status(500).json({ message: error.message });
  }
};
