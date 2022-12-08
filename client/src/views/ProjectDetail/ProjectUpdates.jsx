import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Alert, Col, Row } from 'react-bootstrap';

import { useClient } from '@/hooks';

import ProjectUpdateCard from './ProjectUpdateCard';

const ProjectUpdates = ({ projectId }) => {
  const [updates, setUpdates] = useState([]);
  const client = useClient();

  const handleUpdateDelete = async (updateId) => {
    await client.projectUpdates.delete(projectId, updateId);

    setUpdates((prevUpdates) => prevUpdates.filter((update) => update.id !== updateId));
  };

  useEffect(() => {
    const getUpdates = async () => {
      const response = await client.projectUpdates.getList(projectId);

      setUpdates(response.updates);
    };

    getUpdates();
  }, []);

  return (
    <Row className="mt-5">
      {(!updates || updates?.length === 0) && (
        <Col>
          <Alert variant="secondary">This project currently has no updates to show.</Alert>
        </Col>
      )}
      {updates?.length > 0 && updates.map((update) => (
        <Col className="gy-4" key={update.id} xs={12}>
          <ProjectUpdateCard update={update} onUpdateDelete={handleUpdateDelete} />
        </Col>
      ))}
    </Row>
  );
};

ProjectUpdates.propTypes = {
  projectId: PropTypes.string.isRequired,
};

export default ProjectUpdates;
