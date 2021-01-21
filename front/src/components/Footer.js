import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <>
      <footer id='main-footer'>
        <Navbar bg='light' variant='light'>
          <Container>
            <div className='footer-company-icons mx-auto'>
              <Nav>
                <LinkContainer to='#!'>
                  <Nav.Link>
                    <i className='footer-company-icon fab fa-google-plus-square'></i>
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to='#!'>
                  <Nav.Link>
                    <i className='footer-company-icon fab fa-facebook-square'></i>
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to='#!'>
                  <Nav.Link>
                    <i className='footer-company-icon fab fa-twitter-square'></i>
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to='#!'>
                  <Nav.Link>
                    <i className='footer-company-icon fab fa-linkedin'></i>
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to='#!'>
                  <Nav.Link>
                    <i className='footer-company-icon fab fa-youtube-square'></i>
                  </Nav.Link>
                </LinkContainer>

                <LinkContainer to='#!'>
                  <Nav.Link>
                    <i className='footer-company-icon fab fa-instagram-square'></i>
                  </Nav.Link>
                </LinkContainer>
              </Nav>
            </div>
          </Container>
        </Navbar>
        <div className='footer-copyright text-center'>
          <h6>Copyright &copy; 2021 Where It All Vegan</h6>
        </div>
      </footer>
    </>
  );
};

export default Footer;
