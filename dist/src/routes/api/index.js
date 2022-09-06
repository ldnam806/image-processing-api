"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dev_1 = __importDefault(require("./dev"));
const image_1 = __importDefault(require("../image"));
const apiRoute = (0, express_1.Router)();
apiRoute.get('/', (req, res) => {
    res.send('/api');
});
apiRoute.use('/dev', dev_1.default);
apiRoute.use('/image', image_1.default);
exports.default = apiRoute;
