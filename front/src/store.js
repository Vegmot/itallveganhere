import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { cartReducer } from './reducers/cartReducer';
import {
  createOrderReducer,
  orderDetailsReducer,
  orderToPaidReducer,
  listOrdersReducer,
  adminGetAllOrdersReducer,
  adminSetOrderOutForDeliveryReducer,
} from './reducers/orderReducer';
import {
  postItemReducer,
  postsListReducer,
  likesUpdateReducer,
  dislikesUpdateReducer,
  writePostReducer,
  removePostReducer,
  writeCommentReducer,
  removeCommentReducer,
} from './reducers/postReducer';
import {
  createPremiumPackageReducer,
  updatePremiumPackageReducer,
  removePremiumPackageReducer,
  setUserToPremiumReducer,
  cancelUserPremiumReducer,
} from './reducers/premiumReducer';
import {
  productsListReducer,
  getProductItemReducer,
  adminRemoveProductReducer,
  adminCreateProductReducer,
  adminUpdateProductReducer,
  writeProductReviewReducer,
  getTopProductsReducer,
} from './reducers/productReducer';
import {
  getAProfileReducer,
  getAllProfilesReducer,
  createProfileReducer,
  updateProfileReducer,
  deleteProfileReducer,
} from './reducers/profileReducer';
import {
  userLoginReducer,
  userRegisterReducer,
  getUserInfoReducer,
  getUsersListReducer,
  updateUserInfoReducer,
  deleteUserReducer,
  adminUpdateUserReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
  // cart
  cart: cartReducer,

  // order
  createOrder: createOrderReducer,
  orderDetails: orderDetailsReducer,
  orderToPaid: orderToPaidReducer,
  listOrders: listOrdersReducer,
  adminGetAllOrders: adminGetAllOrdersReducer,
  adminSetOrderOutForDelivery: adminSetOrderOutForDeliveryReducer,

  // post
  postItem: postItemReducer,
  postsList: postsListReducer,
  likesUpdate: likesUpdateReducer,
  dislikesUpdate: dislikesUpdateReducer,
  writePost: writePostReducer,
  removePost: removePostReducer,
  writeComment: writeCommentReducer,
  removeComment: removeCommentReducer,

  // premium
  createPremiumPackage: createPremiumPackageReducer,
  updatePremiumPackage: updatePremiumPackageReducer,
  removePremiumPackage: removePremiumPackageReducer,
  setUserToPremium: setUserToPremiumReducer,
  cancelUserPremium: cancelUserPremiumReducer,

  // product
  productsList: productsListReducer,
  getProductItem: getProductItemReducer,
  adminCreateProduct: adminCreateProductReducer,
  adminUpdateProduct: adminUpdateProductReducer,
  adminRemoveProduct: adminRemoveProductReducer,
  writeProductReview: writeProductReviewReducer,
  getTopProducts: getTopProductsReducer,

  // profile
  getAProfile: getAProfileReducer,
  getAllProfiles: getAllProfilesReducer,
  createProfile: createProfileReducer,
  updateProfile: updateProfileReducer,
  deleteProfile: deleteProfileReducer,

  // user
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  getUserInfo: getUserInfoReducer,
  updateUserInfo: updateUserInfoReducer,
  getUsersList: getUsersListReducer,
  deleteUser: deleteUserReducer,
  adminUpdateUser: adminUpdateUserReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userDataFromStorage = localStorage.getItem('userData')
  ? JSON.parse(localStorage.getItem('userData'))
  : null;

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
  },
  userLogin: { userData: userDataFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
