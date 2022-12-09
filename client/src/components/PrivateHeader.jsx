import React from 'react';
import {
  Dropdown,
  DropdownButton,
  Nav,
  Navbar,
} from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';

import { useUserContext } from '@/contexts/user';

const PrivateHeader = () => {
  const { user } = useUserContext();

  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('cla-token');
    window.location.reload();
  };

  return (
    <Navbar className="p-2 justify-content-center" bg="dark" expand="md" variant="dark">
      <Navbar.Brand href="#">Change Log App</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav" className="d-flex justify-content-between">
        <Nav activeKey={location.pathname}>
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/projects')}>Projects</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => navigate('/projects/create')}>Create Project</Nav.Link>
          </Nav.Item>
        </Nav>
        <DropdownButton className="me-1" variant="secondary" title={user.username}>
          <Dropdown.Item className="text-danger" onClick={handleSignOut}>Sign out</Dropdown.Item>
        </DropdownButton>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PrivateHeader;
