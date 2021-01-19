import express from 'express';
import {
  getAllProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  writeProductReview,
  getTopProducts,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/:productId/reviews').post(protect, writeProductReview);
router
  .route('/:productId')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route('/top').get(getTopProducts);
router.route('/').get(getAllProducts).post(protect, admin, createProduct);

export default router;
