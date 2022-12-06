import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <Navbar className="p-2 justify-content-center" bg="dark" expand="md" variant="dark">
      <Navbar.Brand href="#">Change Log App</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="justify-content-center" activeKey={location.pathname}>
          <Nav.Item>
            <Nav.Link href="/projects">Projects</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/projects/create">Create Project</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
