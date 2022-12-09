import React from 'react';
import { Navbar } from 'react-bootstrap';

const PublicHeader = () => (
  <Navbar className="p-2 justify-content-center" bg="dark" expand="md" variant="dark">
    <Navbar.Brand href="#">Change Log App</Navbar.Brand>
  </Navbar>
);

export default PublicHeader;
