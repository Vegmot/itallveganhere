import {
  GET_POST_ITEM_REQUEST,
  GET_POST_ITEM_SUCCESS,
  GET_POST_ITEM_FAIL,
  GET_POST_ITEM_RESET,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_RESET,
  ADD_LIKE_POST_REQUEST,
  ADD_LIKE_POST_SUCCESS,
  ADD_LIKE_POST_FAIL,
  REMOVE_LIKE_POST_REQUEST,
  REMOVE_LIKE_POST_SUCCESS,
  REMOVE_LIKE_POST_FAIL,
  ADD_DISLIKE_POST_REQUEST,
  ADD_DISLIKE_POST_SUCCESS,
  ADD_DISLIKE_POST_FAIL,
  REMOVE_DISLIKE_POST_REQUEST,
  REMOVE_DISLIKE_POST_SUCCESS,
  REMOVE_DISLIKE_POST_FAIL,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  ADD_COMMENT_RESET,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
} from '../constants/postConstants';

export const postItemReducer = (
  state = { post: { comments: [], likes: [], dislikes: [] } },
  action
) => {
  switch (action.type) {
    case GET_POST_ITEM_REQUEST:
      return { loading: true, ...state };
    case GET_POST_ITEM_SUCCESS:
      return { loading: false, post: action.payload };
    case GET_POST_ITEM_FAIL:
      return { loading: false, error: action.payload };
    case GET_POST_ITEM_RESET:
      return { post: {} };
    default:
      return state;
  }
};

export const postsListReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return { loading: true, posts: [] };
    case GET_POSTS_SUCCESS:
      return {
        loading: false,
        posts: action.payload.posts,
        postsPage: action.payload.postsPage,
        postsPages: action.payload.postsPages,
      };
    case GET_POSTS_FAIL:
      return { loading: false, error: action.payload };
    case GET_POSTS_RESET:
      return { posts: [] };
    default:
      return state;
  }
};

export const addLikePostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case ADD_LIKE_POST_REQUEST:
      return { loading: true };
    case ADD_LIKE_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          likes: action.payload,
        },
        loading: false,
        success: true,
      };
    case ADD_LIKE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeLikePostReducer = (
  state = { post: { likes: [] } },
  action
) => {
  switch (action.type) {
    case REMOVE_LIKE_POST_REQUEST:
      return { loading: true, ...state };
    case REMOVE_LIKE_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          likes: state.post.likes.filter(like => like.user !== action.payload),
        },
        loading: false,
        success: true,
      };
    case REMOVE_LIKE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const addDislikePostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case ADD_DISLIKE_POST_REQUEST:
      return { loading: true };
    case ADD_DISLIKE_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          dislikes: action.payload,
        },
        loading: false,
        success: true,
      };
    case ADD_DISLIKE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removeDislikePostReducer = (
  state = { post: { dislikes: [] } },
  action
) => {
  switch (action.type) {
    case REMOVE_DISLIKE_POST_REQUEST:
      return { loading: true, ...state };
    case REMOVE_DISLIKE_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          dislikes: state.post.dislikes.filter(
            dislike => dislike.user !== action.payload
          ),
        },
        loading: false,
        success: true,
      };
    case REMOVE_DISLIKE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const writePostReducer = (state = { post: {}, posts: [] }, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return { loading: true, ...state };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case ADD_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removePostReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true, ...state };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        loading: false,
        success: true,
      };
    case DELETE_POST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const writeCommentReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case ADD_COMMENT_REQUEST:
      return { loading: true };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          comments: action.payload,
        },
        loading: false,
        success: true,
      };
    case ADD_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case ADD_COMMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const removeCommentReducer = (
  state = { post: { comments: [] } },
  action
) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { loading: true, ...state };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== action.payload
          ),
        },
        loading: false,
        success: true,
      };
    case DELETE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
