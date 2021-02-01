import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import { getAllPremiumPackageItems } from '../../actions/premiumActions';
import Message from '../../components/Message';
import PremiumPackage from './PremiumPackage';

const PremiumPackagesListScreen = () => {
  const dispatch = useDispatch();

  const getAllPremiumPackages = useSelector(
    state => state.getAllPremiumPackages
  );
  const { loading, error, premiumPackages } = getAllPremiumPackages;

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  useEffect(() => {
    dispatch(getAllPremiumPackageItems());
  }, [dispatch]);

  return userData ? (
    userData.isAdmin ? (
      <div className='text-center mt-5'>
        <h2>
          You are an admin! What more do you need? You have full access to
          anything!
        </h2>
      </div>
    ) : userData.isPremium ? (
      <>
        <h1>
          <i className='fas fa-medal'></i> Premium Status
        </h1>
        <p>
          You have activated your premium status on{' '}
          {userData.premiumAt.substring(0, 10)}
        </p>
      </>
    ) : (
      <>
        {loading && <Spinner animation='border' variant='primary' />}
        {error && <Message variant='danger'>{error}</Message>}
        <Row>
          {premiumPackages &&
            premiumPackages.map(premiumPackage => (
              <Col key={premiumPackage._id} md={4}>
                <PremiumPackage premiumPackage={premiumPackage} />
              </Col>
            ))}
        </Row>
      </>
    )
  ) : (
    <>
      {loading && <Spinner animation='border' variant='primary' />}
      {error && <Message variant='danger'>{error}</Message>}
      <Row>
        {premiumPackages &&
          premiumPackages.map(premiumPackage => (
            <Col key={premiumPackage._id} md={4}>
              <PremiumPackage premiumPackage={premiumPackage} />
            </Col>
          ))}
      </Row>
    </>
  );
};

export default PremiumPackagesListScreen;
