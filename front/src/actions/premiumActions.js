import axios from 'axios';
import {
  CREATE_PREMIUM_PACKAGE_REQUEST,
  CREATE_PREMIUM_PACKAGE_SUCCESS,
  CREATE_PREMIUM_PACKAGE_FAIL,
  UPDATE_PREMIUM_PACKAGE_REQUEST,
  UPDATE_PREMIUM_PACKAGE_SUCCESS,
  UPDATE_PREMIUM_PACKAGE_FAIL,
  DELETE_PREMIUM_PACKAGE_REQUEST,
  DELETE_PREMIUM_PACKAGE_SUCCESS,
  DELETE_PREMIUM_PACKAGE_FAIL,
} from '../constants/premiumConstants';

export const createNewPremiumPackage = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_PREMIUM_PACKAGE_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.post('/api/premiums', config);

    dispatch({
      type: CREATE_PREMIUM_PACKAGE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PREMIUM_PACKAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updatePremiumPackageItem = premium => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: UPDATE_PREMIUM_PACKAGE_REQUEST });

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
      `/api/premiums/${premium._id}`,
      premium,
      config
    );

    dispatch({
      type: UPDATE_PREMIUM_PACKAGE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PREMIUM_PACKAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deletePremiumPackageItem = premiumId => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: DELETE_PREMIUM_PACKAGE_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    await axios.delete(`/api/premiums/${premiumId}`);

    dispatch({ type: DELETE_PREMIUM_PACKAGE_SUCCESS });
  } catch (error) {
    dispatch({
      type: DELETE_PREMIUM_PACKAGE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
