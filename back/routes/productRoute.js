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

router.route('/').get(getAllProducts).post(protect, admin, createProduct);
router.route('/:productId/reviews').post(protect, writeProductReview);
router.get('/top', getTopProducts);
router
  .route('/:productId')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
