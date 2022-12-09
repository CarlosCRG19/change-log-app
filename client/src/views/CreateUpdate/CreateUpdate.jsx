import React, { useState } from 'react';
import {
  Card,
  Col,
  Container,
  Button,
  Form,
  InputGroup,
  ListGroup,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { useClient } from '@/hooks';

const CreateUpdate = () => {
  const [currentUpdatePoint, setCurrentUpdatePoint] = useState('');
  const [updatePoints, setUpdatePoints] = useState([]);

  const client = useClient();
  const navigate = useNavigate();

  const { projectId } = useParams();
  const { register, handleSubmit } = useForm({ defaultValues: { type: 'announcement' } });

  const navigateToProjectDetail = () => navigate(`/projects/${projectId}`);

  const handleAddUpdatePoint = () => {
    setUpdatePoints((prevUpdatePoints) => [...prevUpdatePoints, currentUpdatePoint]);
    setCurrentUpdatePoint('');
  };

  const onSubmit = async (data) => {
    const { title, type, description } = data;

    await client.projectUpdates.create(projectId, title, type, description, updatePoints);
    navigateToProjectDetail();
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col className="mx-auto" md={8} lg={6}>
          <Card>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Card.Header>
                <Row>
                  <Col className="pt-2" xs={11}>
                    <Card.Title as="h4">
                      New Update
                    </Card.Title>
                  </Col>
                  <Col xs={1}>
                    <Button className="float-end px-3 mt-1" variant="primary" type="submit">
                      Post
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body>
                <Form.Group className="mb-4">
                  <Form.Label>Type:</Form.Label>
                  <Form.Select style={{ width: '12rem' }} {...register('type')}>
                    <option value="announcement">announcement</option>
                    <option value="new">new</option>
                    <option value="improvement">improvement</option>
                    <option value="bugfix">bugfix</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label>Title: </Form.Label>
                  <Form.Control type="text" {...register('title')} />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Label className="mb-1">Description (Optional): </Form.Label>
                  <Form.Text className="d-block mt-0 mb-2">
                    A little explanation of what changed is not mandatory but always welcome.
                  </Form.Text>
                  <Form.Control as="textarea" rows="3" {...register('description')} />
                </Form.Group>
                <Card.Subtitle as="h5" className="mb-2">Relevant points</Card.Subtitle>
                {updatePoints.length > 0 && (
                <ListGroup className="mb-2">
                  {updatePoints.map((point, index) => (
                    <ListGroup.Item key={index}>{point}</ListGroup.Item>
                  ))}
                </ListGroup>
                )}
                <InputGroup className="mb-2">
                  <Form.Control
                    type="text"
                    placeholder="Updated version of essential dependency"
                    aria-label="Updated version of essential dependency"
                    aria-describedby="addon-button"
                    value={currentUpdatePoint}
                    onChange={({ target: { value } }) => setCurrentUpdatePoint(value)}
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    id="addon-button"
                    onClick={handleAddUpdatePoint}
                  >
                    Add
                  </Button>
                </InputGroup>
              </Card.Body>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUpdate;
