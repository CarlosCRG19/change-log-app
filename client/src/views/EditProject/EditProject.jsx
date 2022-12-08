import React, { useEffect } from 'react';
import {
  Card,
  Col,
  Container,
  Button,
  Form,
  Row,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';

import { useClient } from '@/hooks';

const EditProject = () => {
  const client = useClient();
  const navigate = useNavigate();

  const { projectId } = useParams();
  const { register, reset, handleSubmit } = useForm();

  const navigateToProjectDetail = () => navigate(`/projects/${projectId}`);

  const onSubmit = async (data) => {
    const { name, description } = data;

    await client.projects.update(projectId, name, description);
    navigateToProjectDetail();
  };

  useEffect(() => {
    const getInitialProject = async () => {
      const response = await client.projects.get(projectId);

      reset({ ...response.project });
    };

    getInitialProject();
  }, [projectId]);

  return (
    <Container>
      <Row className="align-items-center">
        <Col className="mx-auto" md={8}>
          <Card>
            <Card.Header className="text-center py-3" as="h4">Edit Project</Card.Header>
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
                  <Button className="float-md-end px-3" variant="light" onClick={navigateToProjectDetail}>
                    Cancel
                  </Button>
                  <Button className="float-md-end me-2 px-3" variant="primary" type="submit">
                    Create
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

export default EditProject;
