import prisma from '../config/prisma.js';

const normalizeReview = (r) => {
  if (!r) return null;
  return {
    ...r,
    _id: r.id,
    product: r.productId,
    user: r.userId,
  };
};

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });
    res.json(reviews.map(normalizeReview));
  } catch (error) {
    console.error('getProductReviews error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { productId, rating, comment, title, userName, userLocation } = req.body;
    if (!productId || !rating || !comment) {
      return res.status(400).json({ message: 'Product, rating, and review comment are required' });
    }

    const review = await prisma.review.create({
      data: {
        productId,
        userId: req.user ? req.user.id : null,
        userName: userName || (req.user ? req.user.name : 'Verified Customer'),
        userLocation: userLocation || 'India',
        rating: Number(rating),
        title: title || '',
        comment,
        verifiedBuyer: true,
      },
    });

    // Update product average rating & reviewCount
    const aggregate = await prisma.review.aggregate({
      where: { productId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await prisma.product.update({
      where: { id: productId },
      data: {
        rating: Number((aggregate._avg.rating || 5).toFixed(1)),
        reviewCount: aggregate._count.rating || 1,
      },
    });

    res.status(201).json(normalizeReview(review));
  } catch (error) {
    console.error('createReview error:', error);
    res.status(500).json({ message: error.message });
  }
};
