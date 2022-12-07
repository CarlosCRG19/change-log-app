import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';
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
    <Card>
      <Card.Header className="text-center py-3" as="h4">Create New Project</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Name: </Form.Label>
            <Form.Control type="text" {...register('name')} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description: </Form.Label>
            <Form.Control type="text" {...register('description')} />
          </Form.Group>
          <div>
            <Button className="float-md-end px-3" variant="light" onClick={navigateToAllProjects}>
              Cancel
            </Button>
            <Button className="float-md-end me-2 px-3" variant="primary" type="submit">
              Create
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default CreateProject;
