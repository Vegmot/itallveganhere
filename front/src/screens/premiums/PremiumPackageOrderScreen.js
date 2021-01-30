import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, ListGroup, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { getPremiumPackageItemDetails } from '../../actions/premiumActions';
import { updateUserToPremium } from '../../actions/userActions';

const PremiumPackageOrderScreen = ({ match, history }) => {
  const premiumId = match.params.id;

  const dispatch = useDispatch();

  const getPremiumPackageItem = useSelector(
    state => state.getPremiumPackageItem
  );
  const { loading, error, premiumPackage } = getPremiumPackageItem;

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  useEffect(() => {
    if (userData) {
      dispatch(getPremiumPackageItemDetails(premiumId));
    }
  }, []);

  const activatePremiumHandler = () => {
    if (window.confirm('Are you sure you want to activate premium status?')) {
      dispatch(updateUserToPremium());
    }
    window.alert('Congratulations! Enjoy your premium status!');
    history.push('/');
  };

  return (
    <>
      {premiumPackage && (
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>User info</h2>
                <p>
                  <strong>Name: </strong>
                  {userData.firstName + ' ' + userData.lastName}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Payment method: </h2>
                <p>Just click Activate button on the right side</p>
              </ListGroup.Item>

              <ListGroup.Item>
                <h2>Selected premium package: </h2>
                <p>
                  <strong>Package name: </strong>
                  {premiumPackage.name}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <p>
                  <strong>Package image: </strong>
                </p>
                <Image
                  src={premiumPackage.image}
                  className='premium-package-order-image'
                />
              </ListGroup.Item>

              <ListGroup.Item>
                <p>
                  <strong>Price: </strong>$ {premiumPackage.price}
                </p>
              </ListGroup.Item>

              <ListGroup.Item>
                <p>
                  <strong>Description: </strong>
                  {premiumPackage.description}
                </p>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order summary</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Package:</Col>
                    <Col>$ {premiumPackage.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Total</Col>
                    <Col>$ {premiumPackage.price}</Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    type='button'
                    className='btn-primary btn-block'
                    onClick={activatePremiumHandler}
                  >
                    Activate
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default PremiumPackageOrderScreen;
