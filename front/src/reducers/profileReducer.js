import {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  GET_PROFILE_RESET,
  GET_ALL_PROFILES_REQUEST,
  GET_ALL_PROFILES_SUCCESS,
  GET_ALL_PROFILES_FAIL,
  GET_ALL_PROFILES_RESET,
  CREATE_PROFILE_REQUEST,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  DELETE_PROFILE_REQUEST,
  DELETE_PROFILE_SUCCESS,
  DELETE_PROFILE_FAIL,
} from '../constants/profileConstants';

export const getAProfileReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case GET_PROFILE_REQUEST:
      return { loading: true };
    case GET_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case GET_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case GET_PROFILE_RESET:
      return { profile: {} };
    default:
      return state;
  }
};

export const getAllProfilesReducer = (state = { profiles: [] }, action) => {
  switch (action.type) {
    case GET_ALL_PROFILES_REQUEST:
      return { loading: true };
    case GET_ALL_PROFILES_SUCCESS:
      return { loading: false, profiles: action.payload };
    case GET_ALL_PROFILES_FAIL:
      return { loading: false, error: action.payload };
    case GET_ALL_PROFILES_RESET:
      return { profiles: [] };
    default:
      return state;
  }
};

export const createProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROFILE_REQUEST:
      return { loading: true };
    case CREATE_PROFILE_SUCCESS:
      return { loading: false, success: true, profile: action.payload };
    case CREATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateProfileReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case UPDATE_PROFILE_SUCCESS:
      return { loading: false, profile: action.payload };
    case UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_PROFILE_RESET:
      return { profile: {} };
    default:
      return state;
  }
};

export const deleteProfileReducer = (state = { profile: {} }, action) => {
  switch (action.type) {
    case DELETE_PROFILE_REQUEST:
      return { loading: true };
    case DELETE_PROFILE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
