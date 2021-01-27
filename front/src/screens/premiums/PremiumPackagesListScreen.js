import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import { getAllPremiumPackageItems } from '../../actions/premiumActions';
import Message from '../../components/Message';
import PremiumPackage from '../../components/PremiumPackage';

const PremiumPackagesListScreen = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  const getAllPremiumPackages = useSelector(
    state => state.getAllPremiumPackages
  );
  const { loading, premiumPackages } = getAllPremiumPackages;

  useEffect(() => {
    dispatch(getAllPremiumPackageItems());
  }, [dispatch]);

  return (
    <>
      {loading && <Spinner animation='border' variant='primary' />}
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
