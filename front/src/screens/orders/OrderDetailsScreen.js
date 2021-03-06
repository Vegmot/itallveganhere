import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { getOrderDetails, payForOrder } from '../../actions/orderActions';
import {
  ORDER_TO_PAID_RESET,
  ADMIN_OUT_FOR_DELIVERY_RESET,
} from '../../constants/orderConstants';

const OrderDetailsScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const [sdkReady, setSdkReady] = useState(false);

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  const orderDetails = useSelector(state => state.orderDetails);
  const { order } = orderDetails;

  const orderToPaid = useSelector(state => state.orderToPaid);
  const { loading: loadingPay, success: successPay } = orderToPaid;

  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  useEffect(() => {
    if (!userData) {
      history.push('/login');
    }
    // PayPal
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || order._id !== orderId || successPay) {
      dispatch({ type: ORDER_TO_PAID_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, order, orderId, successPay, history, userData]);

  const successPaymentHandler = paymentResult => {
    console.log(paymentResult);
    dispatch(payForOrder(orderId, paymentResult));
  };

  return (
    <>
      {order ? (
        <>
          <h1>Order #{order._id}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name: </strong>{' '}
                    {order.user.firstName && order.user.firstName}{' '}
                    {order.user.lastName && order.user.lastName}
                  </p>
                  <strong>Email: </strong>
                  <a href={`mailto:${order.user.email && order.user.email}`}>
                    {order.user.email && order.user.email}
                  </a>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address1}{' '}
                    {order.shippingAddress.address2 &&
                      order.shippingAddress.address2 + ', '}
                    {order.shippingAddress.city},{' '}
                    {order.shippingAddress.zipCode},{' '}
                    {order.shippingAddress.state}{' '}
                    {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant='success'>
                      Delivered on {order.deliveredAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not delivered</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Payment method</h2>
                  <p>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </p>
                  {order.isPaid ? (
                    <Message variant='success'>
                      Paid on {order.paidAt.substring(0, 10)}
                    </Message>
                  ) : (
                    <Message variant='danger'>Not paid</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>Items in cart</h2>
                  {order.orderItems.length === 0 ? (
                    <Message>You have no order.</Message>
                  ) : (
                    <ListGroup variant='flush'>
                      {order.orderItems.map((orderItem, index) => (
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={1}>
                              <Image
                                src={orderItem.image}
                                alt={orderItem.name}
                                fluid
                                rounded
                              />
                            </Col>

                            <Col>
                              <Link to={`/products/${orderItem.product}`}>
                                {orderItem.name}
                              </Link>
                            </Col>

                            <Col md={4}>
                              {orderItem.qty} x $ {addDecimals(orderItem.price)}{' '}
                              = $ {orderItem.qty * addDecimals(orderItem.price)}
                            </Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={4}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <h2>Order summary</h2>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Items</Col>
                      <Col>$ {addDecimals(order.itemsPrice)}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>$ {addDecimals(order.shippingPrice)}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>$ {addDecimals(order.taxPrice)}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>$ {addDecimals(order.totalPrice)}</Col>
                    </Row>
                  </ListGroup.Item>

                  {!order.isPaid && (
                    <ListGroup.Item>
                      {loadingPay && (
                        <Spinner animation='border' variant='primary' />
                      )}
                      {!sdkReady ? (
                        <Spinner animation='border' variant='primary' />
                      ) : (
                        <PayPalButton
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      )}
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </>
      ) : (
        <Message>An error occurred while loading the order</Message>
      )}
    </>
  );
};

export default OrderDetailsScreen;
