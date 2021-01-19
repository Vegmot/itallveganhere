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
} from '../controllers/userController.js';
import { setUserToPremium } from '../controllers/premiumController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/login').post(authUser);
router.route('/register').post(registerUser);
router.route('/userInfo/premium').put(protect, setUserToPremium);
router
  .route('/userInfo')
  .get(protect, getUserInfo)
  .put(protect, updateUserInfo);
router.route('/:userId').get(protect, getUserById).delete(protect, deleteUser);
router.route('/:userId/userInfo').put(protect, admin, adminUpdateUserInfo);
router.route('/').get(protect, admin, getAllUsers);

export default router;
