import express from 'express';
import {
  getMyProfile,
  createProfile,
  updateProfile,
  getAllProfiles,
  deleteProfile,
  getProfileById,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
} from '../controllers/profileController.js';
import { protect, admin } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/:userId/experience/:expId').delete(protect, deleteExperience);
router.route('/:userId/education/:eduId').delete(protect, deleteEducation);
router.route('/:userId/experience').put(protect, addExperience);
router.route('/:userId/education').put(protect, addEducation);
router.route('/myprofile').get(protect, getMyProfile);
router
  .route(':/userId')
  .put(protect, updateProfile)
  .delete(protect, deleteProfile)
  .get(getProfileById);
router
  .route('/')
  .get(protect, admin, getAllProfiles)
  .post(protect, createProfile);

export default router;
