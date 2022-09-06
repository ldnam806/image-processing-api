"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../../../utils");
const imageRoute = (0, express_1.Router)();
imageRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    const isExist = yield (0, utils_1.isFileExist)(filename);
    if (isExist) {
        const file = yield (0, utils_1.resize)(filename, width, height);
        file === null || file === void 0 ? void 0 : file.toFile(`./thumbs/${filename}-${width}-${height}.jpg`, (err) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.send('Had error.');
                return;
            }
            file.toBuffer();
            file.pipe(res.status(200));
        }));
    }
    else {
        res.send('Is not found here.');
    }
}));
exports.default = imageRoute;
