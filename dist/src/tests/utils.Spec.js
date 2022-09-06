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
const utils_1 = require("../../utils");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
describe('Exist file', () => {
    it('Is not exist file', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, utils_1.isFileExist)('noexistfile');
        expect(result).toBe(false);
    }));
    it('Is exist file', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield (0, utils_1.isFileExist)('santamonica');
        expect(result).toBe(true);
    }));
});
describe('RESIZE', () => {
    it('Get a sharp file.', () => __awaiter(void 0, void 0, void 0, function* () {
        const transform = (0, sharp_1.default)(path_1.default.join('images/santamonica.jpg'));
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield transform;
        })).not.toThrow();
    }));
});
