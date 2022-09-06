import { Router, Response, Request, NextFunction } from 'express';
import { resize, isFileExist, isFileExistInThumbs } from '../../../utils';
import path from 'path';

const imageRoute = Router();
const handlerError = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { filename, width, height } = req.query;
  const originalPath = `${filename}-${width}-${height}`;
  const hasInThumbs = await isFileExistInThumbs(originalPath);
  if (hasInThumbs) {
    const options = {
      root: path.join('thumbs')
    };
    res.sendFile(`${filename}-${width}-${height}.jpg`, options, function (err) {
      if (err) {
        next(err);
      } else {
        console.log('Sent:', filename, 'from caching');
      }
    });
  } else {
    const isExist = await isFileExist(filename as string);
    if (!isExist) {
      res.send('Filename Incorrect!');
      return;
    }
    if (
      isNaN(Number(width)) ||
      isNaN(Number(height)) ||
      Number(width) <= 0 ||
      Number(height) <= 0
    ) {
      res.send('Incorrect Parameters!');
      return;
    }
    next();
  }
};

imageRoute.get(
  '/',
  handlerError,
  async (req: Request, res: Response): Promise<void> => {
    const { filename, width, height } = req.query;
    const file = await resize(
      filename as string,
      width as string,
      height as string
    );
    file?.toFile(
      `./thumbs/${filename}-${width}-${height}.jpg`,
      async (err): Promise<void> => {
        if (err) {
          res.send('Had error.');
          return;
        }
        file.toBuffer();
        file.pipe(res.status(200));
      }
    );
  }
);

export default imageRoute;
