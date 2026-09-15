import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  image: { type: String, required: true },
  itemCount: { type: Number, default: 0 },
});

export default mongoose.model('Category', categorySchema);
