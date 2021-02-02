import axios from 'axios';
import {
  GET_POST_ITEM_REQUEST,
  GET_POST_ITEM_SUCCESS,
  GET_POST_ITEM_FAIL,
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  EDIT_POST_ITEM_REQUEST,
  EDIT_POST_ITEM_SUCCESS,
  EDIT_POST_ITEM_FAIL,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
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
  ADD_LIKE_COMMENT_REQUEST,
  ADD_LIKE_COMMENT_SUCCESS,
  ADD_LIKE_COMMENT_FAIL,
  REMOVE_LIKE_COMMENT_REQUEST,
  REMOVE_LIKE_COMMENT_SUCCESS,
  REMOVE_LIKE_COMMENT_FAIL,
  ADD_DISLIKE_COMMENT_REQUEST,
  ADD_DISLIKE_COMMENT_SUCCESS,
  ADD_DISLIKE_COMMENT_FAIL,
  REMOVE_DISLIKE_COMMENT_REQUEST,
  REMOVE_DISLIKE_COMMENT_SUCCESS,
  REMOVE_DISLIKE_COMMENT_FAIL,
} from '../constants/postConstants';

export const getPostsList = (
  keyword = '',
  pageNumber = ''
) => async dispatch => {
  try {
    dispatch({ type: GET_POSTS_REQUEST });

    const res = await axios.get(
      `/api/posts?keyword=${keyword}&pageNumber=${pageNumber}`
    );

    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getPostItem = postId => async dispatch => {
  try {
    dispatch({ type: GET_POST_ITEM_REQUEST });

    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({
      type: GET_POST_ITEM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_POST_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editPostItem = post => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_POST_ITEM_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.put(`/api/posts/${post._id}`, post, config);

    dispatch({
      type: EDIT_POST_ITEM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_POST_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addLikeToPostItem = postId => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_LIKE_POST_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.post(`/api/posts/${postId}/like`, {}, config);

    dispatch({
      type: ADD_LIKE_POST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_LIKE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeLikeFromPostItem = postId => async (dispatch, getState) => {
  try {
    dispatch({ type: REMOVE_LIKE_POST_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    await axios.delete(`/api/posts/${postId}/like`, config);

    dispatch({ type: REMOVE_LIKE_POST_SUCCESS });
  } catch (error) {
    dispatch({
      type: REMOVE_LIKE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addDislikeToPostItem = postId => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_DISLIKE_POST_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.post(`/api/posts/${postId}/dislike`, {}, config);

    dispatch({
      type: ADD_DISLIKE_POST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_DISLIKE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeDislikeFromPostItem = postId => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: REMOVE_DISLIKE_POST_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    await axios.delete(`/api/posts/${postId}/dislike`, config);

    dispatch({ type: REMOVE_DISLIKE_POST_SUCCESS });
  } catch (error) {
    dispatch({
      type: REMOVE_DISLIKE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const writeNewPost = (title, content) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_POST_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.post('/api/posts', { title, content }, config);

    dispatch({
      type: ADD_POST_SUCCESS,
      payload: res.data,
    });

    document.location.href = '/posts';
  } catch (error) {
    dispatch({
      type: ADD_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const writeNewComment = (postId, comment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ADD_COMMENT_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.post(
      `/api/posts/${postId}/comments`,
      comment,
      config
    );

    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const editCommentItem = (postId, comment) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: EDIT_COMMENT_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.put(
      `/api/posts/${postId}/comments/${comment._id}`,
      comment,
      config
    );

    dispatch({
      type: EDIT_COMMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePostItem = postId => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_POST_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    await axios.delete(`/api/posts/${postId}`, config);

    dispatch({ type: DELETE_POST_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCommentItem = (postId, commentId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: DELETE_COMMENT_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    await axios.delete(`/api/posts/${postId}/comments/${commentId}`, config);

    dispatch({ type: DELETE_COMMENT_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addLikeToCommentItem = (postId, commentId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ADD_LIKE_COMMENT_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.post(
      `/api/posts/${postId}/comments/${commentId}/like`,
      {},
      config
    );

    dispatch({
      type: ADD_LIKE_COMMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_LIKE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeLikeFromCommentItem = (postId, commentId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: REMOVE_LIKE_COMMENT_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    await axios.delete(
      `/api/posts/${postId}/comments/${commentId}/like`,
      config
    );

    dispatch({ type: REMOVE_LIKE_COMMENT_SUCCESS });
  } catch (error) {
    dispatch({
      type: REMOVE_LIKE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addDislikeToCommentItem = (postId, commentId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ADD_DISLIKE_COMMENT_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.post(
      `/api/posts/${postId}/comments/${commentId}/dislike`,
      {},
      config
    );

    dispatch({
      type: ADD_DISLIKE_COMMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_DISLIKE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeDislikeFromCommentItem = (postId, commentId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: REMOVE_DISLIKE_COMMENT_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    await axios.delete(
      `/api/posts/${postId}/comments/${commentId}/dislike`,
      config
    );

    dispatch({ type: REMOVE_DISLIKE_COMMENT_SUCCESS });
  } catch (error) {
    dispatch({
      type: REMOVE_DISLIKE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
