import React from 'react';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

const NotFound = ({ history }) => {
  return (
    <>
      <h1 className='x-large text-primary'>
        <i className='fas fa-exclamation-triangle'></i> Page not found!
      </h1>
      <p className='large'>
        Unfortunately, the page you were trying to reach does not exist.
      </p>

      <Button onClick={history.goBack} clasName='btn btn-secondary'>
        Go back
      </Button>
    </>
  );
};

export default withRouter(NotFound);
