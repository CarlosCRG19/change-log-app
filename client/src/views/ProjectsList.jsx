import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';

import { useClient } from '@/hooks';

const formatDatetime = (datetime) => {
  const date = new Date(datetime);

  return date.toDateString();
};

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);

  const client = useClient();

  useEffect(() => {
    const loadProjects = async () => {
      const response = await client.projects.getList();

      setProjects(response.projects);
    };

    loadProjects();
  }, []);

  return (
    <Container>
      <Row>
        {projects?.map((project) => (
          <Col md={4}>
            <Card key={project.id}>
              <Card.Header>Created by author</Card.Header>
              <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Card.Text>{project.description}</Card.Text>
              </Card.Body>
              <Card.Body>
                <Card.Link href={`/projects/${project.id}`}>See detail</Card.Link>
              </Card.Body>
              <Card.Footer>posted on {formatDatetime(project.createdAt)}</Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProjectsList;
