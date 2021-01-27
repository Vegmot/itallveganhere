import React from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';

const PremiumPackage = ({ premiumPackage }) => {
  return (
    <>
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
          <ListGroup.Item>
            <Link to='/' className='btn btn-primary btn-block'>
              Add to cart (+ $ {premiumPackage.price})
            </Link>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default PremiumPackage;
