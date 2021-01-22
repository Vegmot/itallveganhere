import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import Product from '../../components/Product';
import Message from '../../components/Message';
import Paginate from '../../components/Paginate';
import ProductCarousel from '../../components/ProductCarousel';
import { getProductsList } from '../../actions/productActions';

const ProductsListScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productsList = useSelector(state => state.productsList);
  const { loading, error, products, page, pages } = productsList;

  useEffect(() => {
    dispatch(getProductsList(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      {!keyword ? (
        <>
          <h1>Top rated products</h1>
          <ProductCarousel />
        </>
      ) : (
        <Link to='/' className='btn btn-light'>
          Go back
        </Link>
      )}

      <h1>{keyword ? 'Search results' : 'Latest products'}</h1>
      {loading ? (
        <Spinner animation='border' variant='primary' />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default ProductsListScreen;
