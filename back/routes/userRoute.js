import express from 'express';
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserInfo,
  updateUserInfo,
  getAllUsers,
  deleteUser,
  getUserById,
  adminUpdateUserInfo,
  setUserToPremium,
  cancelUserPremium,
  adminSetUserToPremium,
  adminCancelUserPremium,
} from '../controllers/userController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/login').post(authUser);
router.route('/register').post(registerUser);
router.route('/userInfo/premium').put(protect, setUserToPremium);
router.route('/userInfo/unpremium').put(protect, cancelUserPremium);
router
  .route('/userInfo')
  .get(protect, getUserInfo)
  .put(protect, updateUserInfo);
router.route('/:userId/premium').put(protect, admin, adminSetUserToPremium);
router.route('/:userId/unpremium').put(protect, admin, adminCancelUserPremium);
router.route('/:userId/userInfo').put(protect, admin, adminUpdateUserInfo);
router.route('/:userId').get(protect, getUserById).delete(protect, deleteUser);
router.route('/').get(protect, getAllUsers);

export default router;
