import { Router, Response, Request } from 'express';
import { resize, isFileExist } from '../../../utils';

const imageRoute = Router();

imageRoute.get('/', async (req: Request, res: Response) => {
  const { filename, width, height } = req.query;
  const isExist = await isFileExist(filename as string);
  if (isExist) {
    const file = await resize(
      filename as string,
      width as string,
      height as string
    );

    file?.toFile(`./thumbs/${filename}-${width}-${height}.jpg`, async (err) => {
      if (err) {
        res.send('Had error.');
        return;
      }
      file.toBuffer();
      file.pipe(res.status(200));
    });
  } else {
    res.send('Is not found here.');
  }
});

export default imageRoute;
