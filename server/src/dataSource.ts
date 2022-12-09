import { DataSource } from 'typeorm';

import * as models from '@/models';

const createDataSource = (): DataSource => {
  const {
    DB_URL,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DATABASE,
  } = process.env;

  if (DB_URL !== undefined && typeof DB_URL === 'string') {
    return new DataSource({
      type: 'postgres',
      url: DB_URL,
      entities: Object.values(models),
      extra: { rejectUnauthorized: false },
    });
  }

  return new DataSource({
    type: 'postgres',
    host: DB_HOST,
    port: Number(DB_PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    entities: Object.values(models),
  });
};

const dataSource = createDataSource();

export default dataSource;
