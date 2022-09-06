import { Router } from 'express';
import devRoute from './dev';
import imageRoute from '../image';

const apiRoute = Router();

apiRoute.get('/', (req, res) => {
  res.send('/api');
});

apiRoute.use('/dev', devRoute);
apiRoute.use('/image', imageRoute);

export default apiRoute;
