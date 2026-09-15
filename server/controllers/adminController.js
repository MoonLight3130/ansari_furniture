import Product from '../models/Product.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

export const getAnalytics = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'customer' });

    const orders = await Order.find();
    const totalSales = orders.reduce((acc, order) => acc + (order.total || 0), 0);

    const lowStockProducts = await Product.find({ stock: { $lte: 5 } }).limit(5);
    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(6);

    const statusCounts = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      totalSales,
      totalOrders,
      totalProducts,
      totalUsers,
      lowStockCount: lowStockProducts.length,
      lowStockProducts,
      recentOrders,
      statusCounts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, room, collectionName, images, stock, material } = req.body;
    if (!name || !price || !category || !room) {
      return res.status(400).json({ message: 'Name, price, category, and room are required' });
    }

    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const product = new Product({
      ...req.body,
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      images: images && images.length ? images : ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80'],
    });

    const saved = await product.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product successfully removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status, trackingCode } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (status) order.status = status;
    if (trackingCode) order.trackingCode = trackingCode;

    const updated = await order.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
