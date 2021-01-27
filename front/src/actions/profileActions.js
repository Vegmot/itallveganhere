import axios from 'axios';
import {
  GET_MY_PROFILE_REQUEST,
  GET_MY_PROFILE_SUCCESS,
  GET_MY_PROFILE_FAIL,
  GET_PROFILE_ITEM_REQUEST,
  GET_PROFILE_ITEM_SUCCESS,
  GET_PROFILE_ITEM_FAIL,
  GET_ALL_PROFILES_REQUEST,
  GET_ALL_PROFILES_SUCCESS,
  GET_ALL_PROFILES_FAIL,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
} from '../constants/profileConstants';

export const getMyProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_MY_PROFILE_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.get('/api/profiles/myprofile', config);

    dispatch({
      type: GET_MY_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_MY_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserProfileItem = userId => async dispatch => {
  try {
    dispatch({ type: GET_PROFILE_ITEM_REQUEST });

    const res = await axios.get(`/api/profiles/${userId}`);

    dispatch({
      type: GET_PROFILE_ITEM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_ITEM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getAllUserProfiles = () => async dispatch => {
  try {
    dispatch({ type: GET_ALL_PROFILES_REQUEST });

    const res = await axios.get('/api/profiles');

    dispatch({
      type: GET_ALL_PROFILES_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_PROFILES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createUserProfileItem = formData => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PROFILE_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.post('/api/profiles', formData, config);

    dispatch({
      type: CREATE_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfileItem = profile => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.put('/api/profiles/myprofile', profile, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUserProfileItem = userId => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PROFILE_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    await axios.delete(`/api/profiles/${userId}`, config);

    dispatch({ type: DELETE_PROFILE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
