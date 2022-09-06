import { Router } from 'express';
import imageRoute from '../image';

const apiRoute = Router();

apiRoute.get('/', (req, res): void => {
  res.send('/api');
});
apiRoute.use('/image', imageRoute);

export default apiRoute;
