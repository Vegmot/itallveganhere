import express from 'express';
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToOutForDelivery,
  getMyOrders,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/:orderId/pay').put(protect, updateOrderToPaid);
router
  .route('/:orderId/deliver')
  .put(protect, admin, updateOrderToOutForDelivery);
router.route('/:orderId').get(protect, getOrderById);
router.route('/myorders').get(protect, getMyOrders);
router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getAllOrders);

export default router;
