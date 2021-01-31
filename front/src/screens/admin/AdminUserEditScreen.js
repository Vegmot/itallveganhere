import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import {
  adminGetUserInfoById,
  adminUpdateUserInfo,
} from '../../actions/userActions';
import { ADMIN_UPDATE_USER_RESET } from '../../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPremium, setIsPremium] = useState(false);

  const dispatch = useDispatch();

  const adminGetUserInfo = useSelector(state => state.adminGetUserInfo);
  const { loading, error, user } = adminGetUserInfo;

  const adminUpdateUser = useSelector(state => state.adminUpdateUser);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = adminUpdateUser;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: ADMIN_UPDATE_USER_RESET });
      history.push('/admin/users');
    } else {
      if (!user.firstName || !user.lastName || user._id !== userId) {
        dispatch(adminGetUserInfoById(userId));
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
        setIsPremium(user.isPremium);
      }
    }
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      adminUpdateUserInfo({
        _id: userId,
        firstName,
        lastName,
        email,
        isAdmin,
        isPremium,
      })
    );
  };

  return (
    <>
      <Link to='/admin/users' className='btn btn-light my-3'>
        Go back
      </Link>

      <FormContainer>
        <h1>Edit user</h1>
        {loadingUpdate && <Spinner animation='border' variant='primary' />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Spinner animation='border' variant='primary' />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='firstName'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                type='name'
                placeholder="Edit user's first name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='lastName'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type='name'
                placeholder="Edit user's last name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder="Edit user's email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Admin user?'
                value={isAdmin}
                onChange={e => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Form.Group controlId='ispremium'>
              <Form.Check
                type='checkbox'
                label='Activate premium status for this user?'
                value={isPremium}
                onChange={e => setIsPremium(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
