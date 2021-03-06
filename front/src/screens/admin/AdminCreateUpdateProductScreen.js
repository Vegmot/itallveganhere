import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import {
  createProductItem,
  updateProductItem,
  getProductItemDetails,
} from '../../actions/productActions';
import { ADMIN_UPDATE_PRODUCT_RESET } from '../../constants/productConstants';

const AdminUpdateProductScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [message, setMessage] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0.0);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const getProductItem = useSelector(state => state.getProductItem);
  const { product } = getProductItem;

  const adminUpdateProduct = useSelector(state => state.adminUpdateProduct);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adminUpdateProduct;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADMIN_UPDATE_PRODUCT_RESET });
      history.push('/admin/products');
    } else {
      if (!product.name || product._id !== productId) {
        // updating a product
        dispatch(getProductItemDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [successUpdate, dispatch, history, product, productId]);

  const uploadImageHandler = async e => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const res = await axios.post('/api/upload', formData, config);

      setImage(res.data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const createUpdateHandler = e => {
    e.preventDefault();
    dispatch(
      updateProductItem({
        _id: productId,
        name,
        price,
        image,
        description,
        countInStock,
        brand,
        category,
      })
    );
  };

  return (
    <>
      <FormContainer>
        {loadingUpdate && <Spinner animation='border' variant='primary' />}
        {errorUpdate && (
          <Message variant='danger'>
            An error occurred while loading the product
          </Message>
        )}
        {message && <Message variant='success'>{message}</Message>}

        {product && (
          <Form onSubmit={createUpdateHandler}>
            <Form.Group controlId='firstName'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter product name'
                value={name}
                onChange={e => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={e => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image URL'
                value={image}
                onChange={e => setImage(e.target.value)}
              ></Form.Control>
              <Form.File
                id='image-file'
                label='Choose file...'
                custom
                onChange={uploadImageHandler}
              ></Form.File>
              {uploading && <Spinner animation='border' variant='primary' />}
            </Form.Group>

            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={e => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter category'
                value={category}
                onChange={e => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='countInStock'>
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={e => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter description'
                value={description}
                onChange={e => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary' className='my-1'>
              Create / Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default AdminUpdateProductScreen;
