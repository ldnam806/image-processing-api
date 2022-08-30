import { Router } from 'express';
const devRoute = Router();

devRoute.get('/', (req, res) => {
  res.send('/api/dev');
});

export default devRoute;
