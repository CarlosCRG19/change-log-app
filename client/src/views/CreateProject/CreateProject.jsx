import React from 'react';
import {
  Card,
  Col,
  Container,
  Button,
  Form,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useClient } from '@/hooks';

const CreateProject = () => {
  const client = useClient();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const navigateToAllProjects = () => navigate('/projects');

  const onSubmit = async (data) => {
    const { name, description } = data;

    await client.projects.create(name, description);
    navigateToAllProjects();
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col className="mx-auto" md={8} lg={6}>
          <Card>
            <Card.Header className="text-center py-3" as="h4">New Project</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Name: </Form.Label>
                  <Form.Control type="text" {...register('name')} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description: </Form.Label>
                  <Form.Control as="textarea" rows="3" {...register('description')} />
                </Form.Group>
                <div>
                  <Button className="float-end px-3" variant="primary" type="submit">
                    Create
                  </Button>
                  <Button className="float-end px-3 me-2" variant="light" onClick={navigateToAllProjects}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateProject;
