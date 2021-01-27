import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Card } from 'react-bootstrap';
import Rating from './Rating';

const Product = props => {
  return (
    <>
      <LinkContainer
        to={`/products/${props.product._id}`}
        className='product-item-card-outline'
      >
        <Card className='my-3 p-3 rounded product-item-card'>
          <Link to={`/products/${props.product._id}`}>
            <Card.Img src={props.product.image} variant='top' />
          </Link>

          <Card.Body>
            <Link to={`/products/${props.product._id}`}>
              <Card.Title as='div'>
                <strong>{props.product.name}</strong>
              </Card.Title>
            </Link>

            <Card.Text as='div'>
              <Rating
                value={props.product.rating}
                text={`${props.product.numReviews} reviews`}
              />
            </Card.Text>

            <Card.Text as='h3'>$ {props.product.price}</Card.Text>
          </Card.Body>
        </Card>
      </LinkContainer>
    </>
  );
};

export default Product;
