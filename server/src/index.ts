import 'dotenv/config';
import cors from 'cors';
import express, { Application } from 'express';

import dataSource from '@/dataSource';

import { auth } from '@/lib';
import { authMiddleware } from '@/middlewares';
import {
  authPrivateRoutes,
  authPublicRoutes,
  projectsRoutes,
  projectUpdatesRoutes,
} from '@/routes';

const initializeExpress = (): void => {
  let PORT: number = parseInt(process.env.PORT ?? '');
  PORT = Number.isInteger(PORT) ? PORT : 3000;

  const app: Application = express();

  app.use(cors());
  app.use(express.json());

  app.use('/', authPublicRoutes);

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.use('/', authMiddleware);

  app.use('/', authPrivateRoutes);
  app.use('/projects', projectsRoutes);
  app.use('/projects', projectUpdatesRoutes);

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
