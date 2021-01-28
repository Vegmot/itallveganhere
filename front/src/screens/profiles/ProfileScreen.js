import React, { useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import { getMyProfile } from '../../actions/profileActions';

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);

  const getLoggedInUserProfile = useSelector(
    state => state.getLoggedInUserProfile
  );
  const { loading, profile } = getLoggedInUserProfile;

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  useEffect(() => {
    if (userData) {
      dispatch(getMyProfile());
    } else {
      history.push('/login');
    }
  }, [userData, history, dispatch]);

  return (
    <>
      {loading && <Spinner animation='border' variant='primary' />}
      {message && (
        <Message
          variant={message === 'Profile not found' ? 'danger' : 'success'}
        >
          {message}
        </Message>
      )}

      <Button onClick={history.goBack} type='button' className='btn btn-light'>
        Go back
      </Button>

      {profile ? (
        <>
          {setTimeout(() => {
            setMessage('Profile found');
          }, 4000)}
          <h1>You DID have created your profile!</h1>
          <Link to='/profile/profile-form' className='btn btn-primary'>
            Update profile
          </Link>
        </>
      ) : (
        <>
          {setTimeout(() => {
            setMessage('Profile not found');
          }, 4000)}
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
