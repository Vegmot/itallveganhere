import mongoose from 'mongoose';

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    postNumber: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    firstName: { type: String },
    lastName: { type: String },
    avatar: { type: String },
    likes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
    dislikes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        commentLikes: [
          { user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } },
        ],
        commentDislikes: [
          { user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } },
        ],
        text: { type: String, required: true },
        firstName: { type: String },
        lastName: { type: String },
        avatar: { type: String },
        date: { type: Date, default: Date.now },
      },
    ],
    date: { type: Date, default: Date.now },
    updatedDate: { type: Date },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
