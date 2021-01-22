import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import FormContainer from '../components/FormContainer';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userData } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userData) {
      history.push(redirect);
    }
  }, [history, userData, redirect]);

  const submitHandler = e => {
    e.preventDefault();
    setMessage(null);

    if (!firstName || !lastName || !password || !confirmPassword) {
      setMessage('All fields are required');
    } else if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(firstName, lastName, email, password));
    }
  };

  return (
    <FormContainer>
      <h1>Sign up</h1>
      {message && <Message variant='danger'>{message}</Message>}
      {error && (
        <Message variant='danger'>An error occurred while registering.</Message>
      )}
      {loading && <Spinner animation='border' variant='primary' />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='firstName'>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter your first name'
            className={!firstName ? 'has-danger' : 'has-success'}
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='lastName'>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter your last name'
            className={!lastName ? 'has-danger' : 'has-success'}
            value={lastName}
            onChange={e => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            className={email.includes('@') ? 'has-success' : 'has-danger'}
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
            className={
              password !== confirmPassword ? 'has-danger' : 'has-success'
            }
            value={password}
            onChange={e => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='confirmPassword'>
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            className={
              password !== confirmPassword ? 'has-danger' : 'has-success'
            }
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Register
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
