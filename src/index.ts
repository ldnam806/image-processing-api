import express, { Express } from 'express';
import dotenv from 'dotenv';
import apiRoute from './routes/api';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use('/api', apiRoute);
var server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

module.exports = server;
