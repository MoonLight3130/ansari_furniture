import mongoose from 'mongoose';

const colorOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  hex: { type: String, required: true },
  bgClass: { type: String },
});

const dimensionSchema = new mongoose.Schema({
  width: { type: Number },
  height: { type: Number },
  depth: { type: Number },
  unit: { type: String, default: 'cm' },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  price: { type: Number, required: true },
  compareAtPrice: { type: Number },
  category: { type: String, required: true }, // e.g. 'Sofas', 'Chairs', 'Tables', 'Beds', 'Storage', 'Lighting'
  room: { type: String, required: true }, // e.g. 'Living Room', 'Bedroom', 'Dining Room', 'Home Office', 'Outdoor', 'Accessories'
  collectionName: { type: String, default: 'Milano Collection' },
  images: [{ type: String, required: true }],
  secondaryImage: { type: String },
  material: { type: String, default: 'Solid Teak & Bouclé' },
  dimensions: dimensionSchema,
  colors: [colorOptionSchema],
  rating: { type: Number, default: 4.8 },
  reviewCount: { type: Number, default: 0 },
  stock: { type: Number, default: 20 },
  featured: { type: Boolean, default: false },
  bestseller: { type: Boolean, default: false },
  badge: { type: String }, // e.g. 'Bestseller', 'New Arrival', 'Editorial Pick'
  tags: [{ type: String }],
  features: [{ type: String }],
  careInstructions: { type: String, default: 'Wipe clean with a soft dry cloth. Avoid direct sunlight and harsh chemicals.' },
}, { timestamps: true });

productSchema.index({ name: 'text', description: 'text', material: 'text', category: 'text', room: 'text' });

export default mongoose.model('Product', productSchema);
