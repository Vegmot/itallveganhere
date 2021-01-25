import express from 'express';
import {
  createPost,
  getPosts,
  getPostById,
  editPost,
  deletePost,
  addLikePost,
  removeLikePost,
  addDislikePost,
  removeDislikePost,
  addComment,
  editComment,
  deleteComment,
} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router
  .route('/:postId/comments/:commentId')
  .delete(protect, deleteComment)
  .put(protect, editComment);
router.route('/:postId/comments').post(protect, addComment);
router.route('/:postId/like').post(protect, addLikePost);
router.route('/:postId/dislike').post(protect, addDislikePost);
router.route('/:postId/like').delete(protect, removeLikePost);
router.route('/:postId/dislike').delete(protect, removeDislikePost);
router
  .route('/:postId')
  .get(getPostById)
  .delete(protect, deletePost)
  .put(protect, editPost);
router.route('/').get(getPosts).post(protect, createPost);

export default router;
