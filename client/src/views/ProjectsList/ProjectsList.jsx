import React, { useEffect, useState } from 'react';
import {
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

import { useClient } from '@/hooks';

import SearchHeader from './components/SearchHeader';

const formatDatetime = (datetime) => {
  const date = new Date(datetime);

  return date.toDateString();
};

const ProjectsList = () => {
  const [projects, setProjects] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const client = useClient();

  const processSearchParams = (item, value) => {
    if (value) {
      if (searchParams.get(item) !== null) {
        searchParams.set(item, value);
      } else {
        searchParams.append(item, value);
      }
    } else {
      searchParams.delete(item);
    }

    setSearchParams(searchParams);
  };

  const handleSearchTermChange = (projectName) => {
    processSearchParams('name', projectName);
  };

  const loadProjects = async () => {
    const newParams = Object.fromEntries(searchParams);
    const { projects: loadedProjects } = await client.projects.getList({ ...newParams });

    setProjects(loadedProjects);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <Container>
      <SearchHeader
        onSearchTermChange={handleSearchTermChange}
        onSubmit={loadProjects}
      />
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
              <Card.Footer>
                posted on
                {' '}
                {formatDatetime(project.createdAt)}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProjectsList;
