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

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ORDER_REQUEST:
      return { loading: true };
    case CREATE_ORDER_SUCCESS:
      return { loading: false, order: action.payload };
    case CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderToPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_TO_PAID_REQUEST:
      return { loading: true };
    case ORDER_TO_PAID_SUCCESS:
      return { loading: false, success: true };
    case ORDER_TO_PAID_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_TO_PAID_RESET:
      return {};
    default:
      return state;
  }
};
export const listOrdersReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const adminGetAllOrdersReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
export const adminSetOrderOutForDeliveryReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
