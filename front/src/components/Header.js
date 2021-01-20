import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    console.log('Logged out!');
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
                <LinkContainer to={userInfo ? '/users' : '/login'}>
                  <Nav.Link>
                    <i className='fas fa-seedling'></i> Vegans
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to={userInfo ? '/products' : '/login'}>
                  <Nav.Link>
                    <i className='fas fa-shopping-bag'></i> Products
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to={userInfo ? '/posts' : '/login'}>
                  <Nav.Link>
                    <i className='fas fa-pencil-alt'></i> Posts
                  </Nav.Link>
                </LinkContainer>

                {userInfo ? (
                  userInfo.isAdmin ? (
                    <NavDropdown title='Admin' id='adminMenu'>
                      <LinkContainer to='/admin/userslist'>
                        <NavDropdown.Item>Users</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/productslist'>
                        <NavDropdown.Item>Products</NavDropdown.Item>
                      </LinkContainer>

                      <LinkContainer to='/admin/orderslist'>
                        <NavDropdown.Item>Orders</NavDropdown.Item>
                      </LinkContainer>

                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={logoutHandler}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <NavDropdown
                      title={userInfo.firstName + ' ' + userInfo.lastName}
                      id='username'
                    >
                      <NavDropdown.Item href='/users/info'>
                        <i className='fas fa-info-circle'></i> Basic info
                      </NavDropdown.Item>

                      <NavDropdown.Item href='/profiles/:userId'>
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
                        Logout
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
