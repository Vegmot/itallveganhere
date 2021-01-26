import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userData } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <>
      <header>
        <Navbar bg='primary' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand>It All Vegan Here</Navbar.Brand>
            </LinkContainer>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
              <Nav className='ml-auto'>
                <LinkContainer to='/products'>
                  <Nav.Link>
                    <i className='fas fa-shopping-bag'></i> Products
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to='/posts'>
                  <Nav.Link>
                    <i className='fas fa-pencil-alt'></i> Posts
                  </Nav.Link>
                </LinkContainer>

                {userData ? (
                  userData.isAdmin ? (
                    <NavDropdown title='Admin' id='adminMenu'>
                      <LinkContainer to='/admin/users'>
                        <NavDropdown.Item>
                          <i className='fas fa-seedling'></i> Manage users
                        </NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/products'>
                        <NavDropdown.Item>
                          <i className='fas fa-shopping-bag'></i> Manage
                          products
                        </NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/orders'>
                        <NavDropdown.Item>
                          <i className='fas fa-shipping-fast'></i> Manage orders
                        </NavDropdown.Item>
                      </LinkContainer>

                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logoutHandler}>
                        <i className='fas fa-user-minus'></i> Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : userData.isPremium ? (
                    <NavDropdown
                      title={
                        '* ' +
                        ' ' +
                        userData.firstName +
                        ' ' +
                        userData.lastName +
                        ' *'
                      }
                      id='username'
                    >
                      <NavDropdown.Item href='/userInfo'>
                        <i className='fas fa-info-circle'></i> Basic info
                      </NavDropdown.Item>

                      <NavDropdown.Item href='/profile'>
                        <i className='far fa-id-card'></i> Profile
                      </NavDropdown.Item>

                      <NavDropdown.Item href='/cart/:userId'>
                        <i className='fas fa-shopping-cart'></i> My cart
                      </NavDropdown.Item>

                      <NavDropdown.Item href='/orders/:orderId'>
                        <i className='fas fa-shipping-fast'></i> My order
                      </NavDropdown.Item>

                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logoutHandler}>
                        <i className='fas fa-user-minus'></i> Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <NavDropdown
                      title={userData.firstName + ' ' + userData.lastName}
                      id='username'
                    >
                      <NavDropdown.Item href='/userInfo'>
                        <i className='fas fa-info-circle'></i> Basic info
                      </NavDropdown.Item>

                      <NavDropdown.Item href='/profile'>
                        <i className='far fa-id-card'></i> Profile
                      </NavDropdown.Item>

                      <NavDropdown.Item href='/cart/:userId'>
                        <i className='fas fa-shopping-cart'></i> My cart
                      </NavDropdown.Item>

                      <NavDropdown.Item href='/orders/:orderId'>
                        <i className='fas fa-shipping-fast'></i> My order
                      </NavDropdown.Item>

                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logoutHandler}>
                        <i className='fas fa-user-minus'></i> Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  )
                ) : (
                  <LinkContainer to='/login'>
                    <Nav.Link>
                      <i className='fas fa-user'></i> Sign in
                    </Nav.Link>
                  </LinkContainer>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
