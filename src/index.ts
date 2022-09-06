import dotenv from 'dotenv';
import express, { Application } from 'express';
import apiRoute from './routes/api';
dotenv.config();
const app: Application = express();
const port = process.env.PORT;

app.use('/api', apiRoute);
const server = app.listen(port, (): void => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

module.exports = server;
