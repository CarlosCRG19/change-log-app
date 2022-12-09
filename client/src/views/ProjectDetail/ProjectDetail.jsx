import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap';

import { useClient } from '@/hooks';

import ProjectUpdates from './ProjectUpdates';

const ProjectDetail = () => {
  const [project, setProject] = useState({});

  const client = useClient();
  const navigate = useNavigate();

  const { projectId } = useParams();

  const navigateToEditProject = () => navigate(`/projects/${projectId}/edit`);
  const navigateToAllProjects = () => navigate('/projects');
  const navigateToAddUpdate = () => navigate(`/projects/${projectId}/create-update`);

  const deleteProject = async () => {
    client.projects.delete(projectId);
    navigateToAllProjects();
  };

  useEffect(() => {
    const getProject = async () => {
      const response = await client.projects.get(projectId);

      setProject(response.project);
    };

    getProject();
  }, [projectId]);

  return (
    <Container>
      <Row>
        <Col lg={9} xs={12}>
          <h1>{project?.name}</h1>
          <p className="lead">{project?.description}</p>
        </Col>
        <Col>
          <Button className="me-2 me-lg-0 ms-lg-2 px-3 float-lg-end" variant="danger" onClick={deleteProject}>Delete</Button>
          <Button className="px-3 float-lg-end" variant="warning" onClick={navigateToEditProject}>Edit</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="px-5 float-lg-start mt-5" variant="primary" onClick={navigateToAddUpdate}>Add update</Button>
        </Col>
      </Row>
      <ProjectUpdates projectId={projectId} />
    </Container>
  );
};

export default ProjectDetail;
