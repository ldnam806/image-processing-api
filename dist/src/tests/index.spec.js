"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
describe('SERVER RUNNING', () => {
    let server;
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
            request_1.default.get('http://localhost:8000/api/image?filename=santamonica&width=400&height=200', (_, response) => {
                data.status = response.statusCode;
                done();
            });
        });
        it('Status 200', () => {
            expect(data.status).toBe(200);
        });
    });
});
