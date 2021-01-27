import React from 'react';
import { Link } from 'react-router-dom';
import { Card, ListGroup } from 'react-bootstrap';

const PremiumPackage = ({ premiumPackage }) => {
  return (
    <>
      <Card>
        <Card.Img variant='top' src={premiumPackage.image} />
        <Card.Body>
          <Card.Title>{premiumPackage.name}</Card.Title>
          <Card.Text>{premiumPackage.description}</Card.Text>
        </Card.Body>
        <ListGroup>
          <ListGroup.Item>$ {premiumPackage.price}</ListGroup.Item>
        </ListGroup>
      </Card>
    </>
  );
};

export default PremiumPackage;
