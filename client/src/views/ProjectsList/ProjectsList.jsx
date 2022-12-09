import React, { useEffect, useState } from 'react';
import {
  Alert,
  Card,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useClient } from '@/hooks';
import { convertDatetimeToDateString } from '@/utils';

import Paginator from './components/Paginator';
import SearchHeader from './components/SearchHeader';

const renderProjectCard = (project, onSeeDetail) => (
  <Col key={project.id} className="d-flex align-items-stretch gy-4" md={4}>
    <Card style={{ width: '100%' }}>
      <Card.Header className="text-muted">
        Created by
        {' '}
        <strong>{project.creator}</strong>
      </Card.Header>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{project.name}</Card.Title>
        <Card.Text className="mb-4">{project.description}</Card.Text>
        <Card.Link className="mt-auto align-self-end" onClick={onSeeDetail}>See detail</Card.Link>
      </Card.Body>
      <Card.Footer className="text-muted">
        posted on
        {' '}
        {convertDatetimeToDateString(project.createdAt)}
      </Card.Footer>
    </Card>
  </Col>
);

const ProjectsList = () => {
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [projects, setProjects] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const client = useClient();
  const navigate = useNavigate();

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

  const loadProjects = async () => {
    const newParams = Object.fromEntries(searchParams);

    try {
      const response = await client.projects.getList({ ...newParams });

      setPagination(response.pagination);
      setProjects(response.projects);
    } catch (error) {
      if (error.code === 'NO_ENTITY_FOUND') {
        setProjects([]);
      }
    }
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

  const handleSearch = async (data) => {
    let filters = { ...data };

    if (!isAdvancedSearch) {
      filters = { name: filters.name };
    }

    Object.entries(filters).forEach(([key, value]) => processSearchParams(key, value));

    await loadProjects();
  };

  const handlePageChange = async (newPage) => {
    processSearchParams('page', newPage);

    await loadProjects();
  };

  const handleSeeDetail = (projectId) => () => navigate(`/projects/${projectId}`);

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
        {projects?.length > 0 && projects.map(
          (project) => renderProjectCard(project, handleSeeDetail(project.id)),
        )}
      </Row>
      {projects?.length > 0 && (
        <Paginator
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          onChange={handlePageChange}
        />
      )}
    </Container>
  );
};

export default ProjectsList;
