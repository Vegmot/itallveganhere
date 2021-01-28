import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spinner } from 'react-bootstrap';
import { adminGetAllOrdersList } from '../../actions/orderActions';
import Message from '../../components/Message';
import Order from './Order';
import OrderPaginate from '../../components/OrderPaginate';

const AdminOrdersListScreen = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  const listOrders = useSelector(state => state.listOrders);
  const { loading, orders, orderPage, orderPages } = listOrders;

  useEffect(() => {
    if (userData && userData.isAdmin) {
      dispatch(adminGetAllOrdersList());
      if (orders.length > 0) {
        setTimeout(() => {
          setMessage('Successfully fetched orders list');
        }, 4000);
      }
    } else {
      setTimeout(() => {
        setMessage('Only admin users are allowed to make this request');
      }, 4000);
    }
  }, []);

  return (
    <>
      {loading && <Spinner animation='border' variant='primary' />}
      {message && (
        <Message
          variant={
            message === 'Successfully fetched orders list'
              ? 'success'
              : 'danger'
          }
        >
          {message}
        </Message>
      )}
      {orders.length > 0 ? (
        <Table
          striped
          bordered
          hover
          responsive
          className='table-sm text-center'
        >
          <thead>
            <tr>
              <td>ID</td>
              <td>Order destination</td>
              <td>Paid?</td>
              <td>Delivered?</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {userData &&
              userData.isAdmin &&
              orders &&
              orders.map(order => (
                <tr key={order._id}>
                  <Order order={order} />
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <>
          <Message variant='danger'>No orders found</Message>
          <h1>No orders found</h1>
        </>
      )}

      <OrderPaginate orderPage={orderPage} orderPages={orderPages} isAdmin />
    </>
  );
};

export default AdminOrdersListScreen;
