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
exports.isFileExist = exports.resize = void 0;
const sharp_1 = __importDefault(require("sharp"));
const fs_1 = require("fs");
const resize = (fileSource, width, height) => __awaiter(void 0, void 0, void 0, function* () {
    const getFile = `./images/${fileSource}.jpg`;
    try {
        const transform = yield (0, sharp_1.default)(getFile);
        if (width && height && Number(width) > 0 && Number(height) > 0) {
            const resizePx = {
                width: Number(width),
                height: Number(height)
            };
            transform.resize(resizePx);
        }
        return transform;
    }
    catch (e) {
        console.error(e);
    }
});
exports.resize = resize;
const isFileExist = (filename) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield (0, fs_1.readdirSync)('./images');
    // remove tail .jpg or .png
    const names = files.map((file) => file.split('.')[0]);
    return names.includes(filename);
});
exports.isFileExist = isFileExist;
