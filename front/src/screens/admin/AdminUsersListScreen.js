import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Spinner } from 'react-bootstrap';
import { getUsersList } from '../../actions/userActions';
import Message from '../../components/Message';
import User from '../../components/User';

const AdminUsersListScreen = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  const usersList = useSelector(state => state.usersList);
  const { users } = usersList;

  useEffect(() => {
    if (userData && userData.isAdmin) {
      dispatch(getUsersList());
      setTimeout(() => {
        setMessage('Successfully fetched users list');
      }, 4000);
    } else {
      setTimeout(() => {
        setMessage('Only admin users are allowed to make this request');
      }, 4000);
    }
  }, []);

  return (
    <>
      {message && (
        <Message
          variant={
            message === 'Successfully fetched users list' ? 'success' : 'danger'
          }
        >
          {message}
        </Message>
      )}
      <Table striped bordered hover responsive className='table-sm text-center'>
        <thead>
          <tr>
            <td>Avatar</td>
            <td>Name</td>
            <td>Email</td>
            <td>Member since</td>
            <td>Premium</td>
            <td>Admin</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {userData &&
            userData.isAdmin &&
            users &&
            users.map(user => (
              <tr key={user._id}>
                <User user={user} />
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default AdminUsersListScreen;
