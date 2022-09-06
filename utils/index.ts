import sharp, { Sharp } from 'sharp';
import { readdirSync } from 'fs';

export const resize = async (
  fileSource: string,
  width: string,
  height: string
): Promise<Sharp | undefined> => {
  const getFile = `./images/${fileSource}.jpg`;
  try {
    const transform = await sharp(getFile);
    if (width && height && Number(width) > 0 && Number(height) > 0) {
      const resizePx = {
        width: Number(width),
        height: Number(height)
      };
      transform.resize(resizePx);
    }
    return transform;
  } catch (e) {
    console.error(e);
  }
};

export const isFileExist = async (filename: string): Promise<boolean> => {
  const files = await readdirSync('./images');
  // remove tail .jpg or .png
  const names = files.map((file) => file.split('.')[0]);
  return names.includes(filename);
};
