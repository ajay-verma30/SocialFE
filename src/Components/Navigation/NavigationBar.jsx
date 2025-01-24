import React from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './NavigationBar.css';
import {useNavigate} from 'react-router-dom';

function NavigationBar() {
  const navigate = useNavigate();
  const handleProfilePageNav = (e) =>{
    e.preventDefault();
    navigate('/profile');
    ;
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">SOCIALIZER</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <div className="menu-icon-box text-center">
            <Nav.Link className='profile-icon' onClick={handleProfilePageNav}><FontAwesomeIcon icon={faUser} className='menu-icon'/></Nav.Link>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavigationBar