import { useMemo } from 'react';

import ProjectsClient from './ProjectsClient';

const API_URL = import.meta.env.VITE_API_URL;

const useClient = () => {
  const clients = useMemo(() => ({
    projects: new ProjectsClient(`${API_URL}/projects`),
  }), []);

  return clients;
};

export default useClient;
