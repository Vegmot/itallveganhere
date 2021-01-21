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
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAIL,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
} from '../constants/postConstants';

export const getPostsList = () => async dispatch => {
  try {
    dispatch({ type: GET_POSTS_REQUEST });

    const res = await axios.get('/api/posts');

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

export const editPostItem = post => async dispatch => {
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

export const addLikePost = postId => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_LIKES_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.put(`/api/posts/${postId}/like`, config);

    dispatch({
      type: UPDATE_LIKES_SUCCESS,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LIKES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeLikePost = postId => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_LIKES_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.put(`/api/posts/${postId}/unlike`, config);

    dispatch({
      type: UPDATE_LIKES_SUCCESS,
      payload: { id, likes: res.data },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_LIKES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addDislikesPost = postId => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_DISLIKES_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.put(`/api/posts/${postId}/dislike`, config);

    dispatch({
      type: UPDATE_DISLIKES_SUCCESS,
      payload: { id, dislikes: res.data },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DISLIKES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeDislikesPost = postId => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_DISLIKES_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.put(`/api/posts/${postId}/undislike`, config);

    dispatch({
      type: UPDATE_DISLIKES_SUCCESS,
      payload: { id, dislikes: res.data },
    });
  } catch (error) {
    dispatch({
      type: UPDATE_DISLIKES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const writeNewPost = () => async (dispatch, getState) => {
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

    const res = await axios.post('/api/posts', config);

    dispatch({
      type: ADD_POST_SUCCESS,
      payload: res.data,
    });
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

export const writeNewComment = postId => async (dispatch, getState) => {
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

    const res = await axios.post(`/api/posts/${postId}/comments`, config);

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

export const editCommentItem = (postId, comment) => async dispatch => {
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

    dispatch({
      type: DELETE_POST_SUCCESS,
    });
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

    await axios.delete(`/api/posts/${postId}/comments/${commentId}`);

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
