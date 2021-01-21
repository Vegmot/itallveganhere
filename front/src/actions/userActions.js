import axios from 'axios';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
  USER_INFO_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USERS_LIST_REQUEST,
  USERS_LIST_SUCCESS,
  USERS_LIST_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  USER_LOGOUT,
  USER_INFO_RESET,
  USERS_LIST_RESET,
  CANCEL_USER_PREMIUM_FAIL,
  CANCEL_USER_PREMIUM_REQUEST,
  CANCEL_USER_PREMIUM_SUCCESS,
  SET_USER_TO_PREMIUM_FAIL,
  SET_USER_TO_PREMIUM_REQUEST,
  SET_USER_TO_PREMIUM_SUCCESS,
  ADMIN_CANCEL_USER_PREMIUM_FAIL,
  ADMIN_CANCEL_USER_PREMIUM_REQUEST,
  ADMIN_CANCEL_USER_PREMIUM_SUCCESS,
  ADMIN_SET_USER_TO_PREMIUM_FAIL,
  ADMIN_SET_USER_TO_PREMIUM_REQUEST,
  ADMIN_SET_USER_TO_PREMIUM_SUCCESS,
} from '../constants/userConstants';
import { LIST_MY_ORDERS_RESET } from '../constants/orderConstants';

export const login = (email, password) => async dispatch => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });

    localStorage.setItem('userData', JSON.stringify(res.data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (
  firstName,
  lastName,
  email,
  password
) => async dispatch => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      '/api/users/register',
      { firstName, lastName, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });

    localStorage.setItem('userData', JSON.stringify(res.data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => dispatch => {
  localStorage.removeItem('userData');
  localStorage.removeItem('cartItems');
  localStorage.removeItem('shippingAddress');
  localStorage.removeItem('paymentMethod');
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_INFO_RESET });
  dispatch({ type: LIST_MY_ORDERS_RESET });
  dispatch({ type: USERS_LIST_RESET });
  document.location.href = '/';
};

// logged in user gets her/his own info
export const getuserData = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_INFO_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.get('/api/users/userInfo', config);

    dispatch({
      type: USER_INFO_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_INFO_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// logged in user updates her/his own info
export const updateuserData = user => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.put('/api/users/userInfo', user, config);

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: res.data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });

    localStorage.setItem('userData', JSON.stringify(res.data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === 'Invalid token; authorisation failed') {
      dispatch(logout());
    }
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const getUsersList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USERS_LIST_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.get('/api/users', config);

    dispatch({
      type: USERS_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USERS_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = userId => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    await axios.delete(`/api/users/${userId}`, config);

    dispatch({
      type: USER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminUpdateuserInfo = user => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_UPDATE_USER_REQUEST });

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
      `/api/users/${user._id}/userInfo`,
      user,
      config
    );

    dispatch({
      type: ADMIN_UPDATE_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATE_USER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserToPremium = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SET_USER_TO_PREMIUM_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.put(`/api/users/userInfo/premium`, {}, config);

    dispatch({
      type: SET_USER_TO_PREMIUM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SET_USER_TO_PREMIUM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const stopUserPremium = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CANCEL_USER_PREMIUM_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.put('/api/users/userInfo/unpremium', {}, config);

    dispatch({
      type: CANCEL_USER_PREMIUM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CANCEL_USER_PREMIUM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminUpdateUserToPremium = user => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_SET_USER_TO_PREMIUM_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.put(`/api/users/${user._id}/premium`, user, config);

    dispatch({
      type: ADMIN_SET_USER_TO_PREMIUM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_SET_USER_TO_PREMIUM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminStopUserPremium = user => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_CANCEL_USER_PREMIUM_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.put(
      `/api/users/${user._id}/unpremium`,
      user,
      config
    );

    dispatch({
      type: ADMIN_CANCEL_USER_PREMIUM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CANCEL_USER_PREMIUM_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
