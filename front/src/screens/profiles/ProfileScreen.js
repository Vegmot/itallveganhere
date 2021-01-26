import React, { useEffect } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { getMyProfile } from '../../actions/profileActions';

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const getLoggedInUserProfile = useSelector(
    state => state.getLoggedInUserProfile
  );
  const { loading, error, profile } = getLoggedInUserProfile;

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  useEffect(() => {
    if (userData) {
      dispatch(getMyProfile());
    }
  }, [userData, dispatch]);

  return (
    <>
      {loading && <Spinner animation='border' variant='primary' />}
      {error && <Message variant='danger'>{error}</Message>}
      <Button onClick={history.goBack} type='button' className='btn btn-light'>
        Go back
      </Button>

      {profile ? (
        <>
          <h1>You DID have create your profile!</h1>
          <Link to='/profile/profile-form' className='btn btn-primary'>
            Update profile
          </Link>
        </>
      ) : (
        <>
          <h1>You haven't created your profile yet.</h1>
          <Link to='/profile/profile-form' className='btn btn-primary'>
            Create profile
          </Link>
        </>
      )}
    </>
  );
};

export default withRouter(ProfileScreen);
