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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const utils_1 = require("../../../utils");
const path_1 = __importDefault(require("path"));
const imageRoute = (0, express_1.Router)();
const handlerError = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    const originalPath = `${filename}-${width}-${height}`;
    const hasInThumbs = yield (0, utils_1.isFileExistInThumbs)(originalPath);
    if (hasInThumbs) {
        const options = {
            root: path_1.default.join('thumbs')
        };
        res.sendFile(`${filename}-${width}-${height}.jpg`, options, function (err) {
            if (err) {
                next(err);
            }
            else {
                console.log('Sent:', filename, 'from caching');
            }
        });
    }
    else {
        const isExist = yield (0, utils_1.isFileExist)(filename);
        if (!isExist) {
            res.send('Filename Incorrect!');
            return;
        }
        if (isNaN(Number(width)) ||
            isNaN(Number(height)) ||
            Number(width) <= 0 ||
            Number(height) <= 0) {
            res.send('Incorrect Parameters!');
            return;
        }
        next();
    }
});
imageRoute.get('/', handlerError, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, width, height } = req.query;
    const file = yield (0, utils_1.resize)(filename, width, height);
    file === null || file === void 0 ? void 0 : file.toFile(`./thumbs/${filename}-${width}-${height}.jpg`, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            res.send('Had error.');
            return;
        }
        file.toBuffer();
        file.pipe(res.status(200));
    }));
}));
exports.default = imageRoute;
