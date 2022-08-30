import { Router } from 'express';
import { readdirSync } from 'fs';
import sharp from 'sharp';

const imageRoute = Router();

imageRoute.get('/', async (req, res) => {
  // get query from url
  const { filename, width, height } = req.query;
  // get all files in folder images
  const files = await readdirSync('./images');
  // remove tail .jpg or .png
  const names = files.map((file) => file.split('.')[0]);
  // check file exists
  let isExists = names.includes(filename as string);
  if (isExists) {
    const getFile = `./images/${filename}.jpg`;
    try {
      let transform = await sharp(getFile);
      if (width && height) {
        let resizePx = {
          width: Number(width),
          height: Number(height)
        };
        transform.resize(resizePx);
        transform.toFile(`./thumbs/${filename}-thumb.jpg`, async (err) => {
          if (err) {
            res.send('Had error.');
            return;
          }
          transform.toBuffer();
          transform.pipe(res.status(200));
        });
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    res.send('Is not found here.');
  }
});

export default imageRoute;
