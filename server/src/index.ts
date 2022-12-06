import 'dotenv/config';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';

import dataSource from '@dataSource';

const initializeExpress = (): void => {
  let PORT: number = parseInt(process.env.PORT ?? '');
  PORT = Number.isInteger(PORT) ? PORT : 3000;

  const app: Application = express();

  app.use(cors());
  app.use(express.json());

  app.use('/', (_: Request, res: Response) => {
    res.status(200).send({ data: 'Hello from the back-end side' });
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}!`);
  });
};

const initializeApp = async (): Promise<void> => {
  await dataSource.initialize();
  initializeExpress();
};

void initializeApp();
