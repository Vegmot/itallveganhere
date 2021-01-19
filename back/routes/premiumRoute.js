import express from 'express';
import {
  getPremiumPackages,
  createPremiumPackage,
  updatePremiumPackage,
  deletePremiumPackage,
} from '../controllers/premiumController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router
  .route('/:premiumId')
  .put(protect, admin, updatePremiumPackage)
  .delete(protect, admin, deletePremiumPackage);
router
  .route('/')
  .get(protect, admin, getPremiumPackages)
  .post(protect, admin, createPremiumPackage);

export default router;
