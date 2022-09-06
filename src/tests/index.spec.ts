import Request from 'request';

describe('Server running', () => {
  let server: { close: () => void };
  beforeAll(() => {
    server = require('../index');
  });

  afterAll(() => {
    server.close();
  });

  describe('GET', () => {
    const data = {
      status: 0
    };
    beforeAll((done) => {
      Request.get(
        'http://localhost:8000/api/image?filename=santamonica&width=400&height=200',
        (_, response) => {
          data.status = response.statusCode;
          done();
        }
      );
    });
    it('Status 200', () => {
      expect(data.status).toBe(200);
    });
  });
});
