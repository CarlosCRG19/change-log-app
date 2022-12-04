import 'dotenv/config';
import express, { Application, Request, Response } from 'express';

let PORT: number = parseInt(process.env.PORT ?? '');
PORT = Number.isInteger(PORT) ? PORT : 3000;

const app: Application = express();

app.use('/', (_: Request, res: Response) => {
  res.status(200).send({ data: 'Hello from the back-end side' });
});

// Start server
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
