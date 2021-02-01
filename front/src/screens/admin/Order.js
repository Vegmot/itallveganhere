import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrderItem } from '../../actions/orderActions';

const Order = ({ order }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  const deleteOrderHandler = id => {
    if (
      window.confirm(
        'Are you sure you want to delete this user? This cannot be undone.'
      )
    ) {
      dispatch(deleteOrderItem(id));
    }
  };

  return (
    <>
      <td className='align-middle'>
        <Link
          to={
            userData && userData.isAdmin
              ? `/admin/order/${order._id}`
              : `/order/${order._id}`
          }
        >
          {order._id}
        </Link>
      </td>

      <td className='align-middle'>
        {order.user.firstName + ' ' + order.user.lastName}
      </td>

      <td className='align-middle'>
        {order.shippingAddress.address1 +
          ', ' +
          order.shippingAddress.address2 &&
          order.shippingAddress.address2 +
            ', ' +
            order.shippingAddress.city +
            ', ' +
            order.shippingAddress.state +
            ', ' +
            order.shippingAddress.country +
            ' ' +
            order.shippingAddress.zipCode}
      </td>

      <td className='align-middle'>
        {order.user.isPremium ? (
          <i className='fas fa-medal' style={{ color: 'blue' }}></i>
        ) : (
          <i className='fas fa-times' style={{ color: 'red' }}></i>
        )}
      </td>

      <td className='align-middle'>
        {order.isPaid ? (
          order.paidAt.substring(0, 10)
        ) : (
          <i className='fas fa-times' style={{ color: 'red' }}></i>
        )}
      </td>
      <td className='align-middle'>
        {order.isOnDelivery ? (
          order.setOnDeliveryAt.substring(0, 10)
        ) : (
          <i className='fas fa-times' style={{ color: 'red' }}></i>
        )}
      </td>

      <td className='align-middle'>
        <Button
          className='btn btn-danger btn-sm'
          onClick={() => deleteOrderHandler(order._id)}
        >
          <i className='fas fa-trash'></i>
        </Button>
      </td>
    </>
  );
};

export default Order;
