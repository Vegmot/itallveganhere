import {
  GET_PREMIUM_PACKAGES_REQUEST,
  GET_PREMIUM_PACKAGES_SUCCESS,
  GET_PREMIUM_PACKAGES_FAIL,
  GET_PREMIUM_PACKAGE_ITEM_REQUEST,
  GET_PREMIUM_PACKAGE_ITEM_SUCCESS,
  GET_PREMIUM_PACKAGE_ITEM_FAIL,
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
import {
  SET_USER_TO_PREMIUM_REQUEST,
  SET_USER_TO_PREMIUM_SUCCESS,
  SET_USER_TO_PREMIUM_FAIL,
  CANCEL_USER_PREMIUM_REQUEST,
  CANCEL_USER_PREMIUM_SUCCESS,
  CANCEL_USER_PREMIUM_FAIL,
} from '../constants/userConstants';

export const getAllPremiumPackagesReducer = (
  state = { premiumPackages: [] },
  action
) => {
  switch (action.type) {
    case GET_PREMIUM_PACKAGES_REQUEST:
      return { loading: true };
    case GET_PREMIUM_PACKAGES_SUCCESS:
      return { loading: false, premiumPackages: action.payload };
    case GET_PREMIUM_PACKAGES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getPremiumPackageItemReducer = (
  state = { premiumPackage: {} },
  action
) => {
  switch (action.type) {
    case GET_PREMIUM_PACKAGE_ITEM_REQUEST:
      return { loading: true, ...state };
    case GET_PREMIUM_PACKAGE_ITEM_SUCCESS:
      return { loading: false, premiumPackage: action.payload };
    case GET_PREMIUM_PACKAGE_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createPremiumPackageReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PREMIUM_PACKAGE_REQUEST:
      return { loading: true };
    case CREATE_PREMIUM_PACKAGE_SUCCESS:
      return { loading: false, premiumPackage: action.payload };
    case CREATE_PREMIUM_PACKAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updatePremiumPackageReducer = (
  state = { premiumPackage: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_PREMIUM_PACKAGE_REQUEST:
      return { loading: true };
    case UPDATE_PREMIUM_PACKAGE_SUCCESS:
      return { loading: false, premiumPackage: action.payload };
    case UPDATE_PREMIUM_PACKAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const removePremiumPackageReducer = (
  state = { premiumPackage: {} },
  action
) => {
  switch (action.type) {
    case DELETE_PREMIUM_PACKAGE_REQUEST:
      return { loading: true };
    case DELETE_PREMIUM_PACKAGE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PREMIUM_PACKAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const setUserToPremiumReducer = (state = { userData: {} }, action) => {
  switch (action.type) {
    case SET_USER_TO_PREMIUM_REQUEST:
      return { loading: true };
    case SET_USER_TO_PREMIUM_SUCCESS:
      return { loading: false, userData: action.payload };
    case SET_USER_TO_PREMIUM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const cancelUserPremiumReducer = (state = { userData: {} }, action) => {
  switch (action.type) {
    case CANCEL_USER_PREMIUM_REQUEST:
      return { loading: true };
    case CANCEL_USER_PREMIUM_SUCCESS:
      return { loading: false, userData: action.payload };
    case CANCEL_USER_PREMIUM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
