import { useMemo } from 'react';

import HttpClient from './httpClient';

const API_URL = import.meta.env.VITE_API_URL;

const useClient = () => {
  const client = useMemo(() => new HttpClient(API_URL), []);

  return client;
};

export default useClient;
