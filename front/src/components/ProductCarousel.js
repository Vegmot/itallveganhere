import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Image, Spinner } from 'react-bootstrap';
import Message from './Message';
import { getTopFiveProducts } from '../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const getTopProducts = useSelector(state => state.getTopProducts);
  const { loading, error, products } = getTopProducts;

  useEffect(() => {
    dispatch(getTopFiveProducts());
  }, [dispatch]);

  return loading ? (
    <Spinner animation='border' variant='primary' />
  ) : error ? (
    <Message variant='danger'>
      An error occurred while loading top products
    </Message>
  ) : (
    <Carousel pause='hover' className='bg-light'>
      {products.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} ($ {product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
