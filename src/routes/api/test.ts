import { Router } from 'express';
const testRoute = Router();

testRoute.get('/', (req, res) => {
  res.send('/api/test');
});

export default testRoute;
