import React, { useEffect, useState } from 'react';
import {
  Alert,
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
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
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

  const handleAdvancedSearchChange = () => {
    setIsAdvancedSearch((prevIsAdvancedSearch) => {
      if (prevIsAdvancedSearch) {
        searchParams.delete('startDate');
        searchParams.delete('endDate');

        setSearchParams(searchParams);
      }

      return !prevIsAdvancedSearch;
    });
  };

  const loadProjects = async () => {
    const newParams = Object.fromEntries(searchParams);

    try {
      const { projects: loadedProjects } = await client.projects.getList({ ...newParams });

      setProjects(loadedProjects);
    } catch (error) {
      if (error.code === 'NO_ENTITY_FOUND') {
        setProjects([]);
      }
    }
  };

  const handleSearch = async (data) => {
    let filters = { ...data };

    if (!isAdvancedSearch) {
      filters = { name: filters.name };
    }

    Object.entries(filters).forEach(([key, value]) => processSearchParams(key, value));

    await loadProjects();
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <Container>
      <SearchHeader
        initialData={Object.fromEntries(searchParams)}
        isAdvancedSearch={isAdvancedSearch}
        onAvancedSearchChange={handleAdvancedSearchChange}
        onSearch={handleSearch}
      />
      <Row>
        {projects?.length === 0 && (
          <Alert variant="danger">No projects to show. Try changing your search or create your own project!</Alert>
        )}
        {projects?.length > 0 && projects.map((project) => (
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
