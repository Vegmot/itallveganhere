import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../../components/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps';
import { saveShippingAddress } from '../../actions/cartActions';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [address1, setAddress1] = useState(shippingAddress.address1);
  const [address2, setAddress2] = useState(shippingAddress.address2);
  const [city, setCity] = useState(shippingAddress.city);
  const [state, setState] = useState(shippingAddress.state);
  const [zipCode, setZipCode] = useState(shippingAddress.zipCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address1,
        address2,
        city,
        state,
        zipCode,
        country,
      })
    );
    history.push('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address1'>
          <Form.Label>Address 1</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your address'
            value={address1}
            required
            onChange={e => setAddress1(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='address2'>
          <Form.Label>Address 2 (optional)</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter detailed address (ex. Apt #)'
            value={address2}
            onChange={e => setAddress2(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            required
            onChange={e => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='state'>
          <Form.Label>State</Form.Label>
          <Form.Control
            as='select'
            type='text'
            defaultValue='choose'
            value={state}
            required
            onChange={e => setState(e.target.value)}
          >
            <option value='choose' disabled>
              Choose state...
            </option>
            <option value='CA'>CA</option>
            <option value='NY'>NY</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId='zipCode'>
          <Form.Label>Zip code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter zip code'
            value={zipCode}
            required
            onChange={e => setZipCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            as='select'
            type='text'
            defaultValue='choose'
            value={country}
            required
            onChange={e => setCountry(e.target.value)}
          >
            <option value='choose' disabled>
              Choose country...
            </option>
            <option value='United States'>United States</option>
          </Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
