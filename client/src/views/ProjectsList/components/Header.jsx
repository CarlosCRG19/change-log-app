import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap';

const SearchHeader = ({ onSearchTermChange, onSubmit }) => (
  <Row className="mb-5">
    <InputGroup>
      <Form.Control
        type="text"
        placeholder="Some project name"
        aria-label="Some project name"
        aria-describedby="addon-button"
        onChange={(event) => onSearchTermChange(event.target.value)}
      />
      <Button variant="secondary" id="addon-button" onClick={onSubmit}>
        Search
      </Button>
    </InputGroup>
  </Row>
);

SearchHeader.propTypes = {
  onSearchTermChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchHeader;
