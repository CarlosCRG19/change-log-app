import 'dotenv/config';
import cors from 'cors';
import express, { Application } from 'express';

import dataSource from '@/dataSource';
import { auth } from '@/lib';
import { authRoutes, projectsRoutes, projectUpdatesRoutes } from '@/routes';

const initializeExpress = (): void => {
  let PORT: number = parseInt(process.env.PORT ?? '');
  PORT = Number.isInteger(PORT) ? PORT : 3000;

  const app: Application = express();

  app.use(cors());
  app.use(express.json());

  app.use('/', authRoutes);

  app.use('/projects', projectsRoutes);
  app.use('/projects/:projectId/updates', projectUpdatesRoutes);

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
  });
};

const initializeApp = async (): Promise<void> => {
  await dataSource.initialize();
  auth.initializeAuthService();
  initializeExpress();
};

void initializeApp();
