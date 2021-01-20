import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_PAYMENT_METHOD,
  CART_SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const addItemToCart = (productId, qty) => async (dispatch, getState) => {
  const res = await axios.get(`/api/products/${productId}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: res.data._id,
      name: res.data.name,
      image: res.data.image,
      countInStock: res.data.countInStock,
      price: res.data.price,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = productId => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });

  localStorage.removeItem(
    'cartItems',
    JSON.stringify(getState().cart.cartItems)
  );
};

export const saveShippingAddress = address => dispatch => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: address,
  });

  localStorage.setItem('shippingAddress', JSON.stringify(address));
};

export const savePaymentMethod = method => dispatch => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: method,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(method));
};
