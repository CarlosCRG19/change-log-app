import React, { useState } from 'react';
import {
  Card,
  Col,
  Container,
  Button,
  Form,
  Row,
  Alert,
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '@/contexts/user';
import { useClient } from '@/hooks';

const Signup = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const client = useClient();
  const navigate = useNavigate();

  const { setUser } = useUserContext();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const { email, username, password } = data;

    try {
      const { idToken } = await client.auth.signup(email, username, password);

      localStorage.setItem('cla-token', idToken);

      const { user } = await client.auth.me();

      localStorage.setItem('cla-user', { username: user.username });
      setUser(user);
    } catch (error) {
      if (error.code === 'EMAIL_EXISTS') {
        setErrorMessage('There is already an account associated with this email.');
      }
    }
  };

  return (
    <Container>
      <Row className="align-items-center">
        <Col className="mx-auto" md={8} lg={6}>
          <Card>
            <Card.Header className="text-center py-3" as="h4">Signup</Card.Header>
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
                  <Form.Label>Username: </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="johndoe"
                    {...register('username')}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password: </Form.Label>
                  <Form.Control type="password" {...register('password')} />
                </Form.Group>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <div className="mt-5">
                  <Button className="float-end px-4" variant="primary" type="submit">
                    Signup
                  </Button>
                  <Card.Link className="mt-auto align-self-end" onClick={() => navigate('/login')}>I have an account</Card.Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
