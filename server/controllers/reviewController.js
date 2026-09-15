import Review from '../models/Review.js';
import Product from '../models/Product.js';

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment, title, userName, userLocation } = req.body;
    if (!productId || !rating || !comment) {
      return res.status(400).json({ message: 'Product, rating, and review comment are required' });
    }

    const review = await Review.create({
      product: productId,
      user: req.user ? req.user._id : null,
      userName: userName || (req.user ? req.user.name : 'Verified Customer'),
      userLocation: userLocation || 'India',
      rating: Number(rating),
      title: title || '',
      comment,
      verifiedBuyer: true,
    });

    // Update product average rating & reviewCount
    const allReviews = await Review.find({ product: productId });
    const avgRating = allReviews.reduce((acc, item) => item.rating + acc, 0) / allReviews.length;

    await Product.findByIdAndUpdate(productId, {
      rating: Number(avgRating.toFixed(1)),
      reviewCount: allReviews.length,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
