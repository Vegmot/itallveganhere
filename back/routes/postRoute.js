import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  addLikePost,
  removeLikePost,
  addDislikePost,
  removeDislikePost,
  addComment,
  deleteComment,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.route('/:postId/comments/:commentId').delete(protect, deleteComment);
router.route('/:postId/comments').post(protect, addComment);
router.route('/:postId/like').put(protect, addLikePost);
router.route('/:postId/unlike').put(protect, removeLikePost);
router.route('/:postId/dislike').put(protect, addDislikePost);
router.route('/:postId/undislike').put(protect, removeDislikePost);
router.route('/:postId').get(getPostById).delete(protect, deletePost);
router.route('/').get(getPosts).post(protect, createPost);

export default router;
