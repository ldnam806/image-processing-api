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
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const imageRoute = (0, express_1.Router)();
imageRoute.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // get query from url
    const { filename, width, height } = req.query;
    // get all files in folder images
    const files = yield (0, fs_1.readdirSync)('./images');
    // remove tail .jpg or .png
    const names = files.map((file) => file.split('.')[0]);
    // check file exists
    let isExists = names.includes(filename);
    if (isExists) {
        const getFile = `./images/${filename}.jpg`;
        try {
            let transform = yield (0, sharp_1.default)(getFile);
            if (width && height) {
                let resizePx = {
                    width: Number(width),
                    height: Number(height)
                };
                transform.resize(resizePx);
                transform.toFile(`./thumbs/${filename}-thumb.jpg`, (err) => __awaiter(void 0, void 0, void 0, function* () {
                    if (err) {
                        res.send('Had error.');
                        return;
                    }
                    transform.toBuffer();
                    transform.pipe(res.status(200));
                }));
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    else {
        res.send('Is not found here.');
    }
}));
exports.default = imageRoute;
