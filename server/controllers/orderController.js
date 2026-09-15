import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res) => {
  try {
    const {
      customerDetails,
      items,
      shippingAddress,
      deliveryMethod,
      paymentMethod,
      subtotal,
      discount = 0,
      shippingFee = 0,
      tax = 0,
      total,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'Order cannot be empty' });
    }

    if (!customerDetails || !shippingAddress) {
      return res.status(400).json({ message: 'Customer details and shipping address are required' });
    }

    const order = new Order({
      user: req.user ? req.user._id : null,
      customerDetails,
      items,
      shippingAddress,
      deliveryMethod: deliveryMethod || 'Standard White Glove',
      paymentMethod: paymentMethod || 'Card / UPI',
      paymentStatus: 'Completed',
      subtotal,
      discount,
      shippingFee,
      tax,
      total,
      status: 'Confirmed',
    });

    const savedOrder = await order.save();

    // Deduct stock
    for (const item of items) {
      if (item.product) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -Number(item.quantity || 1) }
        });
      }
    }

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // If order has user, only that user or admin can view
    if (order.user && req.user && req.user.role !== 'admin' && order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
