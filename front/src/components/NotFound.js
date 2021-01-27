import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';

const NotFound = ({ history }) => {
  return (
    <>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle'></i> Page not found!
      </h1>
      <p className='large'>
        Unfortunately, the page you were trying to reach does not exist.
      </p>

      <div className='mt-5 my-3'>
        <Button onClick={history.goBack} className='btn btn-secondary'>
          Go back
        </Button>{' '}
        to where you were, or
      </div>

      <div className='my-3'>
        <Link to='/' className='btn btn-primary'>
          Go Home
        </Link>{' '}
        to start fresh!
      </div>

      <div className='my-3'>
        <Link to='/products' className='btn btn-success'>
          Go to Products
        </Link>{' '}
        to browse vegan products we offer!
      </div>

      <div className='my-3'>
        <Link to='/posts' className='btn btn-info'>
          Go to Posts
        </Link>{' '}
        to discuss with other vegans!
      </div>
    </>
  );
};

export default withRouter(NotFound);
