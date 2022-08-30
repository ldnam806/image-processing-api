import Request from 'request';

describe('Server running', () => {
  var server: any;
  beforeAll(() => {
    server = require('../index');
  });

  afterAll(() => {
    server.close();
  });

  describe('GET', () => {
    var data: any = {};
    beforeAll((done) => {
      Request.get(
        'http://localhost:8000/api/image?filename=santamonica&width=400&height=200',
        (error: any, response: any, body: any) => {
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
