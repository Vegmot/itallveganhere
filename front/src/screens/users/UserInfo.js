import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Spinner, Row, Col } from 'react-bootstrap';
import Message from '../../components/Message';
import FormContainer from '../../components/FormContainer';
import { getUserData, updateUserData } from '../../actions/userActions';

const UserInfo = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  const updateUserInfo = useSelector(state => state.updateUserInfo);
  const { loading, error, success, userData: updatedUserData } = updateUserInfo;

  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (userData) {
      dispatch(getUserData());
    }

    if (success) {
      <Message variant='primary'>Successfully updated</Message>;
      dispatch(getUserData());
    }
  }, [userData, dispatch, success]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(updateUserData(updatedUserData));
  };

  return (
    <>
      {loading && <Spinner animation='border' variant='primary' />}
      {error && <Message variant='danger'>{error}</Message>}

      <FormContainer>
        <h1 className='mb-0'>Basic user information</h1>
        <p className='mt-0'>You can also update your information here.</p>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='firstName'>
            <Form.Label>First name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter first name'
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='lastName'>
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter last name'
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email address'
              value={email}
              onChange={e => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' className='btn btn-primary' variant='primary'>
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default UserInfo;
