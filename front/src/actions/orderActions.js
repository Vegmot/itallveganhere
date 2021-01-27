import axios from 'axios';
import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_TO_PAID_REQUEST,
  ORDER_TO_PAID_SUCCESS,
  ORDER_TO_PAID_FAIL,
  ORDER_TO_PAID_RESET,
  LIST_MY_ORDERS_REQUEST,
  LIST_MY_ORDERS_SUCCESS,
  LIST_MY_ORDERS_FAIL,
  LIST_MY_ORDERS_RESET,
  ADMIN_GET_ALL_ORDERS_REQUEST,
  ADMIN_GET_ALL_ORDERS_SUCCESS,
  ADMIN_GET_ALL_ORDERS_FAIL,
  ADMIN_OUT_FOR_DELIVERY_REQUEST,
  ADMIN_OUT_FOR_DELIVERY_SUCCESS,
  ADMIN_OUT_FOR_DELIVERY_FAIL,
} from '../constants/orderConstants';

export const createOrder = order => async (dispatch, getState) => {
  try {
    dispatch({ type: CREATE_ORDER_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.post('/api/orders', order, config);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = orderId => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.get(`/api/orders/${orderId}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getMyOrdersList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: LIST_MY_ORDERS_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.get('/api/orders/myorders', config);

    dispatch({
      type: LIST_MY_ORDERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LIST_MY_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payForOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: ORDER_TO_PAID_REQUEST });

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
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_TO_PAID_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_TO_PAID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deliverOrder = orderId => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_OUT_FOR_DELIVERY_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.put(`/api/orders/${orderId}/deliver`, {}, config);

    dispatch({
      type: ADMIN_OUT_FOR_DELIVERY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_OUT_FOR_DELIVERY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const adminGetAllOrdersList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_GET_ALL_ORDERS_REQUEST });

    const {
      userLogin: { userData },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
    };

    const res = await axios.get('/api/orders', config);

    dispatch({
      type: ADMIN_GET_ALL_ORDERS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_GET_ALL_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
