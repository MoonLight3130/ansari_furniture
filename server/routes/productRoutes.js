import express from 'express';
import {
  getProducts,
  getProductBySlugOrId,
  getFeaturedProducts,
  getBestsellerProducts,
  getRelatedProducts,
  getFilterMeta,
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/meta/filters', getFilterMeta);
router.get('/featured', getFeaturedProducts);
router.get('/bestsellers', getBestsellerProducts);
router.get('/:identifier', getProductBySlugOrId);
router.get('/:id/related', getRelatedProducts);

export default router;
