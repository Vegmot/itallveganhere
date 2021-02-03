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
  const postsOnPage = 8;
  const postsPage = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i', // case insensitive
        },
      }
    : {};

  /* // Thank you Viktoras from Q&A!
  // use the next line in SearchBox.js
  const query = search
    ? {
        name: {
          $regex: search.replace(/[-[\]{}()*+?.,\\/^$|#\s]/g, '\\$&'),
          $options: 'i',
        },
      }
    : {}; */

  const postsCount = await Post.countDocuments({ ...keyword });

  const posts = await Post.find({ ...keyword })
    .sort({ date: -1 })
    .limit(postsOnPage)
    .skip(postsOnPage * (postsPage - 1));

  res.json({
    posts,
    postsPage,
    postsPages: Math.ceil(postsCount / postsOnPage),
  });
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
// POST /api/posts/:postId/like
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
    res.json({ message: 'You have unliked this post' });
  } else {
    post.likes.unshift({ user: req.user._id });
    await post.save();
    res.json(post.likes);
  }
});

// Unlike a post
// DELETE /api/posts/:postId/like
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
    res.json({ message: 'You have liked this post' });
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
// POST /api/posts/:postId/dislike
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
    res.json({ message: 'You have undisliked this post' });
  } else {
    post.dislikes.unshift({ user: req.user._id });
    await post.save();
    res.json(post.dislikes);
  }
});

// Undislike a post
// DELETE /api/posts/:postId/dislike
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
    res.json({ message: 'You have unliked this post' });
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

  if (post) {
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
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

// Like a comment
// POST /api/posts/:postId/comments/:commentId/like
// private
const addLikeComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/) || !post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post) {
    console.log(post.comments);
    const comment = post.comments.filter(
      comment => comment._id === req.params.commentId
    );

    if (comment.commentLikes.find(comLike => comLike.user === req.user._id)) {
      res.json({ message: 'You unliked this comment' });
    } else {
      comment.commentLikes.unshift({ user: req.user._id });
      await post.save();
      res.json(post.comments);
    }
  }
});

// Unlike a post
// DELETE /api/posts/:postId/comments/:commentId/like
// private
const removeLikeComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/) || !post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post) {
    const comment = post.comments.filter(
      comment => comment._id === req.params.commentId
    );

    if (
      comment.commentLikes.find(
        like => like.user.toString() !== req.user._id.toString()
      )
    ) {
      res.json({ message: 'You liked this comment' });
    } else {
      const removeIndex = comment.commentLikes
        .map(like => like.user.toString())
        .indexOf(req.user._id.toString());
      comment.commentLikes.splice(removeIndex, 1);

      await post.save();
      res.json(comment.commentLikes);
    }
  }
});

// Dislike a post
// POST /api/posts/:postId/comments/:commentId/dislike
// private
const addDislikeComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/) || !post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post) {
    const comment = post.comments.filter(
      comment => comment._id === req.params.commentId
    );

    if (
      comment.commentDislikes.find(
        comDislike => comDislike._id === req.user._id
      )
    ) {
      res.json({ message: 'You undisliked this comment' });
    } else {
      comment.commentDislikes.unshift({ user: req.user._id });
      await post.save();
      res.json(post.comments);
    }
  }
});

// Undislike a post
// DELETE /api/posts/:postId/comments/:commentId/dislike
// private
const removeDislikeComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.postId);

  if (!req.params.postId.match(/^[0-9a-fA-F]{24}$/) || !post) {
    res.status(404);
    throw new Error('Post not found');
  }

  if (post) {
    const comment = post.comments.filter(
      comment => comment._id === req.params.commentId
    );

    if (
      comment.commentDislikes.find(
        dislike => dislike.user.toString() !== req.user._id.toString()
      )
    ) {
      res.json({ message: 'You disliked this comment' });
    } else {
      const removeIndex = comment.commentDislikes
        .map(dislike => dislike.user.toString())
        .indexOf(req.user._id.toString());
      comment.commentDislikes.splice(removeIndex, 1);

      await post.save();
      res.json(comment.commentDislikes);
    }
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
  addLikeComment,
  removeLikeComment,
  addDislikeComment,
  removeDislikeComment,
};
