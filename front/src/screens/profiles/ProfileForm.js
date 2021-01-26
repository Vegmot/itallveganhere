import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Col, Row, FormGroup } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { createUserProfileItem } from '../../actions/profileActions';

const ProfileForm = ({ history }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    city: '',
    state: '',
    status: '',
    favourites: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    city,
    state,
    status,
    favourites,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const createProfile = useSelector(state => state.createProfile);
  const { success: successCreateProfile } = createProfile;

  const changeHandler = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = e => {
    e.preventDefault();
    createUserProfileItem(formData);
  };

  return (
    <FormContainer>
      <div>
        <Link className='btn btn-light my-1' to='/'>
          Go Back
        </Link>
      </div>

      <h1 className='large text-primary'>Create your profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Please let us know who you are
      </p>

      <Form className='form' onSubmit={e => submitHandler(e)}>
        <FormGroup controlId='status' className='status'>
          <select name='status' value={status} onChange={e => changeHandler(e)}>
            <option value='0'>Select status</option>
            <option value='1'>0 - 1 year</option>
            <option value='2'>2 - 4 years</option>
            <option value='3'>5 - 8 years</option>
            <option value='4'>8+ years</option>
          </select>
          <small className='form-text'>
            How long have you been going vegan?
          </small>
        </FormGroup>

        <FormGroup controlId='company' className='company'>
          <input
            type='text'
            placeholder='Enter company...'
            name='company'
            value={company}
            onChange={e => changeHandler(e)}
          />
          <small className='form-text'>
            Tell me where you vegan have been hiding at
          </small>
        </FormGroup>

        <FormGroup controlId='website' className='website'>
          <input
            type='text'
            placeholder='Enter website address...'
            name='website'
            value={website}
            onChange={e => changeHandler(e)}
          />
          <small className='form-text'>Do you have any website?</small>
        </FormGroup>

        <FormGroup controlId='city' className='city'>
          <input
            type='text'
            placeholder='Enter city...'
            name='city'
            value={city}
            onChange={e => changeHandler(e)}
          />
          <small className='form-text'>
            I'll just assume you are located within the US for now...
          </small>
        </FormGroup>

        <FormGroup controlId='state' className='state'>
          <select name='state' value={state} onChange={e => changeHandler(e)}>
            <option value='0'>Select state</option>
            <option value='CA'>CA</option>
            <option value='NY'>NY</option>
          </select>
          <small className='form-text'>
            I'll just assume you are located within the US for now...
          </small>
        </FormGroup>

        <FormGroup controlId='favourites' className='favourites'>
          <input
            type='text'
            placeholder='Enter your favourite fruits or veggies...'
            name='favourites'
            value={favourites}
            onChange={e => changeHandler(e)}
          />
          <small className='form-text'>
            Please use comma-separated values (eg. Banana, Blueberry, Kale,
            Cabbage, ...)
          </small>
        </FormGroup>

        <FormGroup controlId='bio' className='bio'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={e => changeHandler(e)}
          ></textarea>
          <small className='form-text'>
            A short and simple self-introductory text would be nice. It doesn't
            have to be short, though.
          </small>
        </FormGroup>

        <div className='my-4'>
          <button
            type='button'
            className='btn btn-light'
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
          >
            Add Social Network Links
          </button>
          <span>
            <small className='ml-3'> (Optional)</small>
          </span>
        </div>

        {displaySocialInputs && (
          <>
            <FormGroup controlId='socialInput' className='social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={e => changeHandler(e)}
              />
            </FormGroup>

            <FormGroup className='social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={e => changeHandler(e)}
              />
            </FormGroup>

            <FormGroup className='social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={e => changeHandler(e)}
              />
            </FormGroup>

            <FormGroup className='social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={e => changeHandler(e)}
              />
            </FormGroup>

            <FormGroup className='social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={e => changeHandler(e)}
              />
            </FormGroup>
          </>
        )}

        <input type='submit' className='btn btn-primary my-2' />
      </Form>
    </FormContainer>
  );
};

export default ProfileForm;
