import asyncHandler from 'express-async-handler';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

// Create a post
// POST /api/posts
// private
const createPost = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  const post = new Post({
    postNumber: Number(await Post.countDocuments({})) + 1,
    title: req.body.title,
    content: req.body.content,
    firstName: user.firstName,
    lastName: user.lastName,
    avatar: user.avatar,
    user: req.user._id,
  });

  const newPost = await post.save();
  res.status(201).json(newPost);
});

// Get all posts
// GET /api/posts
// public
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).sort({ date: -1 });

  res.json(posts);
});

// Get a post by id
// GET /api/posts/:postId
// public
const getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  // check for ObjectId format and post
  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/) || !post) {
    res.status(404);
    throw new Error('Post not found');
  }

  res.json(post);
});

// Edit a post
// PUT /api/posts/:postId
// private
const editPost = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.findById(req.params.postId);

  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/) || !post) {
    res.status(404);
    throw new Error('Post not found');
  } else {
    post.title = title || post.title;
    post.content = content || post.content;
    post.date = Date.now();

    const editedPost = await post.save();
    res.json(editedPost);
  }
});

// Delete a post
// DELETE /api/posts/:postId
// private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/) || !post) {
    res.status(404);
    throw new Error('Post not found');
  }

  await post.remove();
  res.json({ message: 'Successfully deleted the post' });
});

// Like a post
// PUT /api/posts/:postId/like
// private
const addLikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/) || !post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (
    post.likes.find(like => like.user.toString() === req.user._id.toString())
  ) {
    res.status(400);
    throw new Error('You have already liked this post');
  } else {
    post.likes.unshift({ user: req.user._id });
    await post.save();
    res.json(post.likes);
  }
});

// Unlike a post
// PUT /api/posts/:postId/unlike
// private
const removeLikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/) || !post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (
    post.likes.find(like => like.user.toString() !== req.user._id.toString())
  ) {
    res.status(400);
    throw new Error('Unlike BEFORE like?');
  } else {
    const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user._id.toString());
    post.likes.splice(removeIndex, 1);

    await post.save();
    res.json(post.likes);
  }
});

// Dislike a post
// PUT /api/posts/:postId/dislike
// private
const addDislikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/) || !post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (
    post.dislikes.find(
      dislike => dislike.user.toString() === req.user._id.toString()
    )
  ) {
    res.status(400);
    throw new Error('You have already disliked this post');
  } else {
    post.dislikes.unshift({ user: req.user._id });
    await post.save();
    res.json(post.dislikes);
  }
});

// Undislike a post
// PUT /api/posts/:postId/undislike
// private
const removeDislikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/) || !post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (
    post.dislikes.find(
      dislike => dislike.user.toString() !== req.user._id.toString()
    )
  ) {
    res.status(400);
    throw new Error('Please do something BEFORE undoing it!');
  } else {
    const removeIndex = post.dislikes
      .map(dislike => dislike.user.toString())
      .indexOf(req.user._id.toString());
    post.dislikes.splice(removeIndex, 1);

    await post.save();
    res.json(post.dislikes);
  }
});

// Add a comment on a post
// POST /api/posts/:postId/comments
// private
const addComment = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  const post = await Post.findById(req.params.postId);

  if (!user || !post) {
    res.status(404);
    throw new Error('Invalid data');
  } else {
    const newComment = {
      user: req.user._id,
      text: req.body.text,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      avatar: req.user.avatar,
    };

    post.comments.push(newComment);
    await post.save();
    res.json(post.comments);
  }
});

// Edit a comment on a post
// PUT /api/posts/:postId/comments/:commentId
// private
const editComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  const comment = post.comments.filter(
    comment => comment._id === req.params.commentId
  );

  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  } else {
    comment.text = req.body.text || comment.text;
    comment.date = Date.now();

    await post.save();
    res.json(post.comments);
  }
});

// Delete a comment
// DELETE /api/posts/:postId/comments/:commentId
// private
const deleteComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);
  const comment = post.comments.filter(
    comment => comment._id === req.params.commentId
  );
  if (!comment) {
    res.status(404);
    throw new Error('Comment not found');
  } else {
    const removeIndex = post.comments
      .map(comment => comment._id)
      .indexOf(req.params.commentId);
    post.comments.splice(removeIndex, 1);

    await post.save();
    res.json(post.comments);
  }
});

export {
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
};
