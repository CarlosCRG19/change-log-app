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

import { useUserContext } from '@/contexts/user';
import { useClient } from '@/hooks';

const Login = () => {
  const client = useClient();
  const { setUser } = useUserContext();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { email, password } = data;

    const { idToken } = await client.auth.login(email, password);

    localStorage.setItem('cla-token', idToken);

    const { user } = await client.auth.me();

    setUser(user);
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col className="mx-auto" md={8}>
          <Card>
            <Card.Header className="text-center py-3" as="h4">Login</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3">
                  <Form.Label>Email: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="john.doe@mail.com"
                    {...register('email')}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password: </Form.Label>
                  <Form.Control type="password" {...register('password')} />
                </Form.Group>
                <div className="mt-5">
                  <Button className="float-end px-4" variant="primary" type="submit">
                    Login
                  </Button>
                  <Card.Link className="mt-auto align-self-end" href="/signup">I don't have an account</Card.Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
