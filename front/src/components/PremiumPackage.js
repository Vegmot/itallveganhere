import React from 'react';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Card, ListGroup } from 'react-bootstrap';

const PremiumPackage = ({ premiumPackage }) => {
  return (
    <>
      <LinkContainer to='/'>
        <Card className='my-5 premium-card'>
          <ListGroup.Item className='premium-image'>
            <Card.Img variant='top' src={premiumPackage.image} rounded />
          </ListGroup.Item>

          <Card.Body>
            <Card.Title>
              <strong>{premiumPackage.name}</strong>
            </Card.Title>
            <Card.Text>$ {premiumPackage.price}</Card.Text>
            <Card.Text>{premiumPackage.description}</Card.Text>
          </Card.Body>

          <ListGroup>
            <ListGroup.Item className='premium-checkout'>
              <Link to='/' className='btn btn-primary btn-block'>
                Activate{' '}
                <span className='ml-1'>($ {premiumPackage.price})</span>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </LinkContainer>
    </>
  );
};

export default PremiumPackage;
