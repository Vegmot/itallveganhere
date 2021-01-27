import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Image,
  Card,
  Row,
  Col,
  Button,
  Form,
  ListGroup,
} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { addItemToCart, removeFromCart } from '../../actions/cartActions';
import Message from '../../components/Message';

const CartScreen = ({ match, location, history }) => {
  const dispatch = useDispatch();

  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addItemToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const maxQtyPerOrder = 10;

  const removeFromCartHandler = id => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = e => {
    history.push('/login?redirect=shipping');
  };

  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty. <Link onClick={history.goBack}> Go back</Link>
            </Message>
          ) : (
            <ListGroup variant='flush'>
              {cartItems.map(cartItem => (
                <ListGroup.Item key={cartItem.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={cartItem.image}
                        alt={cartItem.name}
                        fluid
                        rounded
                      />
                    </Col>

                    <Col md={3}>
                      <Link to={`/product/${cartItem.product}`}>
                        {cartItem.name}
                      </Link>
                    </Col>

                    <Col md={2}>$ {addDecimals(cartItem.price)}</Col>

                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={cartItem.qty}
                        onChange={e =>
                          dispatch(
                            addItemToCart(
                              cartItem.product,
                              Number(e.target.value)
                            )
                          )
                        }
                      >
                        {[...Array(maxQtyPerOrder).keys()].map(x => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => removeFromCartHandler(cartItem.product)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>
                  Subtotal ({cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                  ) items
                </h2>
                ${' '}
                {addDecimals(
                  cartItems
                    .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
                    .toFixed(2)
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type='button'
                  className='btn-block'
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed to checkout
                </Button>
              </ListGroup.Item>

              <ListGroup.Item>
                <Link to='/products' className='btn btn-block btn-secondary'>
                  Browse more products
                </Link>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(CartScreen);
