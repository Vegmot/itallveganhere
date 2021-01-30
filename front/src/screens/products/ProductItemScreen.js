import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import {
  Card,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Form,
  Spinner,
} from 'react-bootstrap';
import Message from '../../components/Message';
import Rating from '../../components/Rating';
import {
  getProductItemDetails,
  writeProductReviewItem,
} from '../../actions/productActions';
import { CREATE_PRODUCT_REVIEW_RESET } from '../../constants/productConstants';

const ProductItemScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const getProductItem = useSelector(state => state.getProductItem);
  const { loading, error, product } = getProductItem;

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  const writeProductReview = useSelector(state => state.writeProductReview);
  const {
    success: successProductReview,
    error: errorProductReview,
  } = writeProductReview;

  useEffect(() => {
    if (successProductReview) {
      alert('Review submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: CREATE_PRODUCT_REVIEW_RESET });
    }
    dispatch(getProductItemDetails(match.params.id));
  }, [dispatch, match, successProductReview]);

  const maxQtyPerOrder = 10;

  const addToCartHandler = () => {
    if (!userData) {
      history.push('/login');
    } else {
      history.push(`/cart/${match.params.id}?qty=${qty}`);
    }
  };

  const submitReviewHandler = e => {
    e.preventDefault();
    dispatch(
      writeProductReviewItem(match.params.id, {
        rating,
        comment,
      })
    );
  };

  const updateProductHandler = () => {
    if (userData && userData.isAdmin) {
      history.push(`/admin/products/${product._id}/create-update`);
    } else {
      setMessage('Not authorised as admin');
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    }
  };

  return (
    <>
      <Button onClick={history.goBack} className='btn btn-dark my-3'>
        Go back
      </Button>

      {loading ? (
        <Spinner animation='border' variant='primary' />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          {message && <Message variant='danger'>{message}</Message>}
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>

            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>
                    <strong>{product.name}</strong>
                  </h2>
                </ListGroup.Item>
              </ListGroup>

              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>

              <ListGroup.Item>
                <p>{product.description}</p>
              </ListGroup.Item>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>$ {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        <strong>
                          {product.countInStock > 0
                            ? 'In stock'
                            : 'Out of stock'}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={e => setQty(e.target.value)}
                          >
                            {[...Array(maxQtyPerOrder).keys()].map(x => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className='btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>

                  {userData.isAdmin && (
                    <ListGroup.Item>
                      <Button
                        onClick={updateProductHandler}
                        className='btn btn-info btn-block'
                        type='button'
                      >
                        Update this product
                      </Button>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map(r => (
                  <ListGroup.Item key={r._id}>
                    <strong>{r.firstName + ' ' + r.lastName}</strong>
                    <Rating value={r.rating} />
                    <p>{r.createdAt.substring(0, 10)}</p>
                    <p>{r.comment}</p>
                  </ListGroup.Item>
                ))}

                <ListGroup.Item>
                  <h2>Write a review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userData ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={e => setRating(e.target.value)}
                        >
                          <option value=''>Choose...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      <Link to='/login'>Log in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default withRouter(ProductItemScreen);
