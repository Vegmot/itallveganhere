import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Col, Row, FormGroup } from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import Message from '../../components/Message';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMyProfile,
  createUserProfileItem,
  updateUserProfileItem,
} from '../../actions/profileActions';
import { UPDATE_PROFILE_RESET } from '../../constants/profileConstants';

const ProfileForm = ({ history }) => {
  const dispatch = useDispatch();

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const createProfile = useSelector(state => state.createProfile);
  const { success: successCreateProfile } = createProfile;

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  const getUserInfo = useSelector(state => state.getUserInfo);
  const { user } = getUserInfo;

  const getLoggedInUserProfile = useSelector(
    state => state.getLoggedInUserProfile
  );
  const { profile } = getLoggedInUserProfile;

  const updateProfile = useSelector(state => state.updateProfile);
  const { success: successUpdateProfile } = updateProfile;

  const [company, setCompany] = useState('');
  const [website, setWebsite] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [status, setStatus] = useState('');
  const [favourites, setFavourites] = useState('');
  const [bio, setBio] = useState('');
  const [twitter, setTwitter] = useState('');
  const [facebook, setFacebook] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [youtube, setYoutube] = useState('');
  const [instagram, setInstagram] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!userData) {
      history.push('/login');
    } else {
      dispatch(getMyProfile());
      if (!profile) {
        setMessage(null);
        setCompany('');
        setWebsite('');
        setCity('');
        setState('');
        setStatus('');
        setFavourites('');
        setBio('');
        setTwitter('');
        setFacebook('');
        setLinkedin('');
        setYoutube('');
        setInstagram('');
      } else {
        setMessage(null);
        setCompany(profile.company ? profile.company : '');
        setWebsite(profile.website ? profile.website : '');
        setCity(profile.city ? profile.city : '');
        setState(profile.state ? profile.state : '');
        setStatus(profile.status ? profile.status : '');
        setFavourites(profile.favourites ? profile.favourites : '');
        setBio(profile.bio ? profile.bio : '');
        setTwitter(profile.social.twitter ? profile.social.twitter : '');
        setFacebook(profile.social.facebook ? profile.social.facebook : '');
        setLinkedin(profile.social.linkedin ? profile.social.linkedin : '');
        setYoutube(profile.social.youtube ? profile.social.youtube : '');
        setInstagram(profile.social.instagram ? profile.social.instagram : '');
      }
    } // no dependencies here as it falls into infinite loop
  }, []);

  const submitHandler = e => {
    e.preventDefault();
    if (!status || !company || !city || !state) {
      setMessage('Please fill in all required fields');
      setTimeout(() => {
        setMessage(null);
      }, 4000);
    } else {
      if (!profile) {
        dispatch(
          createUserProfileItem({
            id: user._id,
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
          })
        );
        alert('Successfully created your profile');
      } else {
        dispatch(
          updateUserProfileItem({
            id: user._id,
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
          })
        );
        alert('Successfully updated your profile');
      }
    }
  };

  return (
    <>
      {message && <Message variant='danger'>{message}</Message>}

      <FormContainer>
        <div>
          <Link className='btn btn-light my-1' to='/'>
            Go Home
          </Link>
        </div>

        <h1 className='large text-primary'>Create your profile</h1>
        <p className='lead'>
          <i className='fas fa-user'></i> Please let us know who you are
        </p>
        <small>*: Required field</small>
        <Form className='form' onSubmit={e => submitHandler(e)}>
          <FormGroup controlId='status' className='status'>
            <select
              name='status'
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value='0'>* Select status</option>
              <option value='0 - 1 year'>0 - 1 year</option>
              <option value='2 - 4 years'>2 - 4 years</option>
              <option value='5 - 8 years'>5 - 8 years</option>
              <option value='8+ years'>8+ years</option>
            </select>
            <small className='form-text'>
              * How long have you been going vegan?
            </small>
          </FormGroup>

          <FormGroup controlId='company' className='company'>
            <input
              type='text'
              placeholder='* Enter company...'
              name='company'
              value={company}
              onChange={e => setCompany(e.target.value)}
            />
            <small className='form-text'>
              * Tell me where you vegan have been hiding at professionally
            </small>
          </FormGroup>

          <FormGroup controlId='website' className='website'>
            <input
              type='text'
              placeholder='Enter website address...'
              name='website'
              value={website}
              onChange={e => setWebsite(e.target.value)}
            />
            <small className='form-text'>Do you have any website?</small>
          </FormGroup>

          <FormGroup controlId='city' className='city'>
            <input
              type='text'
              placeholder='* Enter city...'
              name='city'
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <small className='form-text'>
              * I'll just assume you are located within the US for now...
            </small>
          </FormGroup>

          <FormGroup controlId='state' className='state'>
            <select
              name='state'
              value={state}
              onChange={e => setState(e.target.value)}
            >
              <option value='0'>* Select state</option>
              <option value='CA'>CA</option>
              <option value='NY'>NY</option>
            </select>
            <small className='form-text'>
              * I'll just assume you are located within the US for now...
            </small>
          </FormGroup>

          <FormGroup controlId='favourites' className='favourites'>
            <input
              type='text'
              placeholder='Enter your favourite fruits or veggies...'
              name='favourites'
              value={favourites}
              onChange={e => setFavourites(e.target.value)}
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
              onChange={e => setBio(e.target.value)}
            ></textarea>
            <small className='form-text'>
              A short and simple self-introductory text would be nice. It
              doesn't have to be short, though.
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
                  onChange={e => setTwitter(e.target.value)}
                />
              </FormGroup>

              <FormGroup className='social-input'>
                <i className='fab fa-facebook fa-2x'></i>
                <input
                  type='text'
                  placeholder='Facebook URL'
                  name='facebook'
                  value={facebook}
                  onChange={e => setFacebook(e.target.value)}
                />
              </FormGroup>

              <FormGroup className='social-input'>
                <i className='fab fa-youtube fa-2x'></i>
                <input
                  type='text'
                  placeholder='YouTube URL'
                  name='youtube'
                  value={youtube}
                  onChange={e => setYoutube(e.target.value)}
                />
              </FormGroup>

              <FormGroup className='social-input'>
                <i className='fab fa-linkedin fa-2x'></i>
                <input
                  type='text'
                  placeholder='Linkedin URL'
                  name='linkedin'
                  value={linkedin}
                  onChange={e => setLinkedin(e.target.value)}
                />
              </FormGroup>

              <FormGroup className='social-input'>
                <i className='fab fa-instagram fa-2x'></i>
                <input
                  type='text'
                  placeholder='Instagram URL'
                  name='instagram'
                  value={instagram}
                  onChange={e => setInstagram(e.target.value)}
                />
              </FormGroup>
            </>
          )}

          <input type='submit' className='btn btn-primary my-2' />
        </Form>
      </FormContainer>
    </>
  );
};

export default ProfileForm;
