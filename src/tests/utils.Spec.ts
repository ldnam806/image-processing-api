import { isFileExist } from '../../utils';

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
