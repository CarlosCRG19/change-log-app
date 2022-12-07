import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Col,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const SearchHeader = (props) => {
  const {
    initialData,
    isAdvancedSearch,
    onAvancedSearchChange,
    onSearch,
  } = props;

  const { register, handleSubmit } = useForm({
    defaultValues: { ...initialData },
  });

  return (
    <Row className="mb-5">
      <Form onSubmit={handleSubmit(onSearch)}>
        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Some project name"
            aria-label="Some project name"
            aria-describedby="addon-button"
            {...register('name') }
          />
          <Button type="submit" variant="secondary" id="addon-button">
            Search
          </Button>
        </InputGroup>
        <Col className="mt-3">
          <Form.Check
            type="switch"
            label="Advanced Search"
            checked={isAdvancedSearch}
            onChange={onAvancedSearchChange}
          />
          {isAdvancedSearch && (
            <Row className="mt-3">
              <Col className="mb-2" md={3}>
                <Form.Group>
                  <Form.Label>Start date</Form.Label>
                  <Form.Control type="date" {...register('startDate')} />
                </Form.Group>
              </Col>
              <Col className="mb-2" md={3}>
                <Form.Group>
                  <Form.Label>End date</Form.Label>
                  <Form.Control type="date" {...register('endDate')} />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Creator</Form.Label>
                  <Form.Control type="text" {...register('creator')} />
                </Form.Group>
              </Col>
            </Row>
          )}
        </Col>
      </Form>
    </Row>
  );
};

SearchHeader.defaultProps = {
  initialData: {},
};

SearchHeader.propTypes = {
  initialData: PropTypes.shape({
    name: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  isAdvancedSearch: PropTypes.bool.isRequired,
  onAvancedSearchChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchHeader;
