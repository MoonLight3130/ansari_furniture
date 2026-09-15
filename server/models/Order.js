import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  image: { type: String, required: true },
  color: { type: String },
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customerDetails: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  items: [orderItemSchema],
  shippingAddress: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  deliveryMethod: { type: String, default: 'Standard White Glove' },
  paymentMethod: { type: String, default: 'Card / UPI' },
  paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Completed' },
  subtotal: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  shippingFee: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing',
  },
  trackingCode: { type: String },
}, { timestamps: true });

orderSchema.pre('save', function (next) {
  if (!this.orderNumber) {
    const randomSuffix = Math.floor(100000 + Math.random() * 900000);
    this.orderNumber = `ANS-${new Date().getFullYear()}-${randomSuffix}`;
  }
  next();
});

export default mongoose.model('Order', orderSchema);
