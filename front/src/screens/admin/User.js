import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../actions/userActions';

const User = ({ user }) => {
  const dispatch = useDispatch();

  const deleteUserHandler = id => {
    if (
      window.confirm(
        'Are you sure you want to delete this user? This cannot be undone.'
      )
    ) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <td className='align-middle'>
        <Image src={user.avatar} fluid className='admin-users-avatar' />
      </td>
      <td className='align-middle'>
        <Link to={`/users/${user._id}/userInfo`}>
          {user.firstName + ' ' + user.lastName}
        </Link>
      </td>
      <td className='align-middle'>
        <a href={`mailto:${user.email}`}>{user.email}</a>
      </td>
      <td className='align-middle'>{user.createdAt.substring(0, 10)}</td>
      <td className='align-middle'>
        {user.isPremium ? (
          user.premiumAt.substring(0, 10)
        ) : (
          <i className='fas fa-times' style={{ color: 'red' }}></i>
        )}
      </td>
      <td className='align-middle'>
        {user.isAdmin ? (
          <i className='fas fa-check' style={{ color: 'green' }}></i>
        ) : (
          <i className='fas fa-times' style={{ color: 'red' }}></i>
        )}
      </td>
      <td className='align-middle'>
        <Button
          className='btn btn-danger'
          onClick={() => deleteUserHandler(user._id)}
        >
          <i className='fas fa-trash'></i>
        </Button>
      </td>
    </>
  );
};

export default User;
