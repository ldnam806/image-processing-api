"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
describe('Server running', () => {
    var server;
    beforeAll(() => {
        server = require('../index');
    });
    afterAll(() => {
        server.close();
    });
    describe('GET', () => {
        var data = {};
        beforeAll((done) => {
            request_1.default.get('http://localhost:8000/api/image?filename=santamonica&width=400&height=200', (error, response, body) => {
                data.status = response.statusCode;
                done();
            });
        });
        it('Status 200', () => {
            expect(data.status).toBe(200);
        });
    });
});
