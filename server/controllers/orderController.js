import prisma from '../config/prisma.js';

const normalizeOrder = (o) => {
  if (!o) return null;
  return {
    ...o,
    _id: o.id,
    items: Array.isArray(o.items)
      ? o.items.map((item) => ({ ...item, _id: item.id }))
      : [],
  };
};

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

    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    const orderNumber = `ANS-${new Date().getFullYear()}-${randomSuffix}`;

    const order = await prisma.order.create({
      data: {
        orderNumber,
        userId: req.user ? req.user.id : null,
        customerDetails,
        shippingAddress,
        deliveryMethod: deliveryMethod || 'Standard White Glove',
        paymentMethod: paymentMethod || 'Card / UPI',
        paymentStatus: 'Completed',
        subtotal: Number(subtotal),
        discount: Number(discount),
        shippingFee: Number(shippingFee),
        tax: Number(tax),
        total: Number(total),
        status: 'Confirmed',
        items: {
          create: items.map((item) => ({
            productId: item.productId || item.product || null,
            name: item.name,
            price: Number(item.price),
            quantity: Number(item.quantity || 1),
            image: item.image,
            color: item.color || null,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    // Deduct stock
    for (const item of items) {
      const prodId = item.productId || item.product;
      if (prodId) {
        try {
          await prisma.product.update({
            where: { id: prodId },
            data: {
              stock: { decrement: Number(item.quantity || 1) },
            },
          });
        } catch (e) {
          // ignore if product id mismatch
        }
      }
    }

    res.status(201).json(normalizeOrder(order));
  } catch (error) {
    console.error('createOrder error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(orders.map(normalizeOrder));
  } catch (error) {
    console.error('getMyOrders error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await prisma.order.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.userId && req.user && req.user.role !== 'admin' && order.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to view this order' });
    }

    res.json(normalizeOrder(order));
  } catch (error) {
    console.error('getOrderById error:', error);
    res.status(500).json({ message: error.message });
  }
};
