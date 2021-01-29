import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spinner, Row, Col } from 'react-bootstrap';
import {
  getProductsList,
  createProductItem,
} from '../../actions/productActions';
import Message from '../../components/Message';
import Product from './Product';
import Paginate from '../../components/Paginate';
import { ADMIN_CREATE_PRODUCT_RESET } from '../../../../../fruitables/frontend/src/constants/productConstants';

const AdminProductssListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  const productsList = useSelector(state => state.productsList);
  const { loading, page, pages, products } = productsList;

  useEffect(() => {
    dispatch({ type: ADMIN_CREATE_PRODUCT_RESET });

    if (userData && userData.isAdmin) {
      dispatch(getProductsList('', pageNumber));
      setTimeout(() => {
        setMessage('Successfully fetched products list');
      }, 4000);
    } else {
      history.push('/login');
    }
  }, [userData, pageNumber, history]);

  const createProductHandler = () => {
    dispatch(createProductItem());
  };

  return (
    <>
      <Row className='align-items-center'>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create a product
          </Button>
        </Col>
      </Row>

      {loading && <Spinner animation='border' variant='primary' />}
      {message && (
        <Message
          variant={
            message === 'Successfully fetched products list'
              ? 'success'
              : 'danger'
          }
        >
          {message}
        </Message>
      )}
      <Table striped bordered hover responsive className='table-sm text-center'>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
            <td>Image</td>
            <td>Category</td>
            <td>Brand</td>
            <td>Price</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {userData &&
            userData.isAdmin &&
            products &&
            products.map(product => (
              <tr key={product._id}>
                <Product product={product} />
              </tr>
            ))}
        </tbody>
      </Table>

      <Paginate pages={pages} page={page} isAdmin />
    </>
  );
};

export default AdminProductssListScreen;
