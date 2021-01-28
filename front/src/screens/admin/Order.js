import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deliverOrder } from '../../actions/orderActions';

const Order = ({ order }) => {
  const dispatch = useDispatch();

  const deliverOrderHandler = id => {
    if (
      window.confirm(
        'Are you sure you want to delete this user? This cannot be undone.'
      )
    ) {
      dispatch(deliverOrder(id));
    }
  };

  return (
    <>
      <td className='align-middle'>
        <Link to={`/orders/${order._id}`}>{order._id}</Link>
      </td>
      <td className='align-middle'>
        {order.shippingAddress.city + ' ' + order.shippintAddress.state}
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
          className='btn btn-danger'
          onClick={() => deliverOrderHandler(order._id)}
        >
          <i className='fas fa-trash'></i>
        </Button>
      </td>
    </>
  );
};

export default Order;
