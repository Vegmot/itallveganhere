import {
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCT_ITEM_REQUEST,
  GET_PRODUCT_ITEM_SUCCESS,
  GET_PRODUCT_ITEM_FAIL,
  ADMIN_DELETE_PRODUCT_REQUEST,
  ADMIN_DELETE_PRODUCT_SUCCESS,
  ADMIN_DELETE_PRODUCT_FAIL,
  ADMIN_CREATE_PRODUCT_REQUEST,
  ADMIN_CREATE_PRODUCT_SUCCESS,
  ADMIN_CREATE_PRODUCT_FAIL,
  ADMIN_CREATE_PRODUCT_RESET,
  ADMIN_UPDATE_PRODUCT_REQUEST,
  ADMIN_UPDATE_PRODUCT_SUCCESS,
  ADMIN_UPDATE_PRODUCT_FAIL,
  ADMIN_UPDATE_PRODUCT_RESET,
  CREATE_PRODUCT_REVIEW_REQUEST,
  CREATE_PRODUCT_REVIEW_SUCCESS,
  CREATE_PRODUCT_REVIEW_FAIL,
  CREATE_PRODUCT_REVIEW_RESET,
  GET_TOP_PRODUCTS_REQUEST,
  GET_TOP_PRODUCTS_SUCCESS,
  GET_TOP_PRODUCTS_FAIL,
} from '../constants/productConstants';

export const productsListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_PRODUCTS_REQUEST:
      return { loading: true };
    case GET_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
      };
    case GET_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getProductItemReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_ITEM_REQUEST:
      return { loading: true, ...state };
    case GET_PRODUCT_ITEM_SUCCESS:
      return { loading: false, product: action.payload };
    case GET_PRODUCT_ITEM_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminRemoveProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case ADMIN_DELETE_PRODUCT_REQUEST:
      return { loading: true };
    case ADMIN_DELETE_PRODUCT_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adminCreateProductReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CREATE_PRODUCT_REQUEST:
      return { loading: true };
    case ADMIN_CREATE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case ADMIN_CREATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_CREATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const adminUpdateProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_PRODUCT_REQUEST:
      return { loading: true };
    case ADMIN_UPDATE_PRODUCT_SUCCESS:
      return { loading: false, product: action.payload };
    case ADMIN_UPDATE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_UPDATE_PRODUCT_RESET:
      return {};
    default:
      return state;
  }
};

export const writeProductReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_REVIEW_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case CREATE_PRODUCT_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_PRODUCT_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const getTopProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case GET_TOP_PRODUCTS_REQUEST:
      return { loading: true };
    case GET_TOP_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };
    case GET_TOP_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
