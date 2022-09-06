import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import apiRoute from './routes/api';
dotenv.config();
const app: Application = express();
const port = process.env.PORT;
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
app.use('/api', apiRoute);
const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

module.exports = server;
