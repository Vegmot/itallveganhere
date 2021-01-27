import express from 'express';
import {
  getPremiumPackages,
  getPremiumPackageById,
  createPremiumPackage,
  updatePremiumPackage,
  deletePremiumPackage,
} from '../controllers/premiumController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router
  .route('/:premiumId')
  .get(getPremiumPackageById)
  .put(protect, admin, updatePremiumPackage)
  .delete(protect, admin, deletePremiumPackage);
router
  .route('/')
  .get(getPremiumPackages)
  .post(protect, admin, createPremiumPackage);

export default router;
