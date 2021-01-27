import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Col, Table, Spinner } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { getMyOrdersList } from '../../actions/orderActions';

const MyOrdersListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  const listOrders = useSelector(state => state.listOrders);
  const { loading, error, orders } = listOrders;

  useEffect(() => {
    if (!userData) {
      history.push('/login');
    } else {
      dispatch(getMyOrdersList());
    }
  }, [dispatch, history, userData]);

  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  return (
    <>
      <Row>
        <Col>
          {orders ? (
            <>
              <h2>My orders</h2>
              {loading ? (
                <Spinner animation='border' variant='primary' />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Delivered</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>{addDecimals(order.totalPrice)}</td>
                        <td>
                          {order.isPaid ? (
                            order.paidAt.substring(0, 10)
                          ) : (
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}
                            ></i>
                          )}
                        </td>
                        <td>
                          {order.isDelivered ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}
                            ></i>
                          )}
                        </td>
                        <td>
                          <LinkContainer to={`/order/${order._id}`}>
                            <Button className='btn-sm' variant='light'>
                              Details
                            </Button>
                          </LinkContainer>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </>
          ) : (
            <>
              <h2>
                Make sure you HAVE PLACED ORDERS, because we couldn't find any!
              </h2>
              <Link to='/products' className='btn btn-success'>
                Go to Products
              </Link>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default MyOrdersListScreen;
