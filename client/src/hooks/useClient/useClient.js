import { useMemo } from 'react';

import AuthClient from './authClient';
import ProjectsClient from './projectsClient';
import ProjectUpdatesClient from './projectUpdatesClient';

const API_URL = import.meta.env.VITE_API_URL;

const useClient = () => {
  const clients = useMemo(() => ({
    auth: new AuthClient(`${API_URL}`),
    projects: new ProjectsClient(`${API_URL}/projects`),
    projectUpdates: new ProjectUpdatesClient(`${API_URL}/projects`),
  }), []);

  return clients;
};

export default useClient;
