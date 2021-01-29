import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import {
  getProductDetail,
  adminUpdateProduct,
} from '../actions/productActions';
import { ADMIN_UPDATE_PRODUCT_RESET } from '../constants/productConstants';

const AdminUpdateProductScreen = ({ match, history }) => {
  const productId = match.params.id;

  return <></>;
};

export default AdminUpdateProductScreen;
