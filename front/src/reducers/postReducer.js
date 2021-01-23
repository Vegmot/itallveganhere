import {
  GET_POST_ITEM_REQUEST,
  GET_POST_ITEM_SUCCESS,
  GET_POST_ITEM_FAIL,
  GET_POST_ITEM_RESET,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POSTS_RESET,
  UPDATE_LIKES_REQUEST,
  UPDATE_LIKES_SUCCESS,
  UPDATE_LIKES_FAIL,
  UPDATE_DISLIKES_REQUEST,
  UPDATE_DISLIKES_SUCCESS,
  UPDATE_DISLIKES_FAIL,
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

export const postItemReducer = (state = { post: {} }, action) => {
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

export const likesUpdateReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case UPDATE_LIKES_REQUEST:
      return { loading: true };
    case UPDATE_LIKES_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.id
            ? { ...post, likes: action.payload.likes }
            : post
        ),
        loading: false,
      };
    case UPDATE_LIKES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const dislikesUpdateReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case UPDATE_DISLIKES_REQUEST:
      return { loading: true };
    case UPDATE_DISLIKES_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.payload.id
            ? { ...post, dislikes: action.payload.dislikes }
            : post
        ),
        loading: false,
      };
    case UPDATE_DISLIKES_FAIL:
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

export const removePostReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case DELETE_POST_REQUEST:
      return { loading: true };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload),
        loading: false,
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
      };
    case ADD_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case ADD_COMMENT_RESET:
      return {};
    default:
      return state;
  }
};

export const removeCommentReducer = (state = { post: {} }, action) => {
  switch (action.type) {
    case DELETE_COMMENT_REQUEST:
      return { loading: true };
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
      };
    case DELETE_COMMENT_FAIL:
    default:
      return state;
  }
};
