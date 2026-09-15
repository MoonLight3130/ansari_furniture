import express from 'express';
import { getProductReviews, createReview } from '../controllers/reviewController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/product/:productId', getProductReviews);
router.post('/', optionalAuth, createReview);

export default router;
