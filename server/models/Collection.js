import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  eyebrow: { type: String, default: 'CURATED SERIES' },
  tagline: { type: String },
  description: { type: String, required: true },
  heroImage: { type: String, required: true },
  secondaryImage: { type: String },
  accentColor: { type: String, default: '#1C251E' },
  itemCount: { type: Number, default: 0 },
});

export default mongoose.model('Collection', collectionSchema);
