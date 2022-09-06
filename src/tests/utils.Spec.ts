import { isFileExist } from '../../utils';
import sharp from 'sharp';
import path from 'path';

describe('Exist file', () => {
  it('Is not exist file', async () => {
    const result = await isFileExist('noexistfile');
    expect(result).toBe(false);
  });

  it('Is exist file', async () => {
    const result = await isFileExist('santamonica');
    expect(result).toBe(true);
  });
});

describe('RESIZE', () => {
  it('Get a sharp file.', async () => {
    const transform = sharp(path.join('images/santamonica.jpg'));
    expect(async () => {
      await transform;
    }).not.toThrow();
  });
});
