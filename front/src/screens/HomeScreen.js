import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <>
      <Container>
        <Row className='text-center'>
          <Col>
            <h1>Welcome to IAVH!</h1>
            <p>This is where all of your dreams, hopes and wishes come true.</p>
            <small>* Restrictions apply.</small>
          </Col>
        </Row>

        <Row className='text-center my-5'>
          <Col md={12}>
            <Link to='/register' className='btn btn-primary mr-2'>
              Register
            </Link>

            <Link to='/login' className='btn btn-light ml-2'>
              Login
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default HomeScreen;
