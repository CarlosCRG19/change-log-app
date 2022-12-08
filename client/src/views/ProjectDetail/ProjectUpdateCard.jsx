import React from 'react';
import {
  Badge,
  Card,
  Col,
  Dropdown,
  Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

import { ThreeDotsAnchor } from '@/components';
import { convertDatetimeToDateString } from '@/utils';

const UPDATE_TYPE_VARIANT = {
  announcement: 'primary',
  improvement: 'secondary',
  new: 'success',
  bugfix: 'danger',
};

const ProjectUpdateCard = ({ update, onUpdateDelete }) => (
  <Card>
    <Card.Header>
      <Row>
        <Col className="pt-2" xs={11}>
          <Card.Title>
            {update.title}
            <Badge className="ms-2" pill bg={UPDATE_TYPE_VARIANT[update.type]}>{update.type}</Badge>
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Posted on
            {' '}
            {convertDatetimeToDateString(update.createdAt)}
          </Card.Subtitle>
        </Col>
        <Col xs={1}>
          <Dropdown className="align-items-end">
            <Dropdown.Toggle as={ThreeDotsAnchor} />
            <Dropdown.Menu size="sm" title="">
              <Dropdown.Item className="text-danger" onClick={() => onUpdateDelete(update.id)}>Delete</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    </Card.Header>
    <Card.Body>
      <Card.Text>{update.description}</Card.Text>
      <ul>
        {update.points?.map((point, index) => <li key={index}>{point}</li>)}
      </ul>
    </Card.Body>
  </Card>
);

ProjectUpdateCard.propTypes = {
  update: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf(['new', 'announcement', 'improvement', 'bugfix']),
    createdAt: PropTypes.string,
    description: PropTypes.string,
    points: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onUpdateDelete: PropTypes.func.isRequired,
};

export default ProjectUpdateCard;
