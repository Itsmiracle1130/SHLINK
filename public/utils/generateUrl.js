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
exports.generateUniqueShortCode = exports.generateRandomId = void 0;
const crypto_1 = require("crypto");
const url_model_1 = require("../model/url.model");
function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = (0, crypto_1.randomInt)(0, characters.length);
        randomId += characters.charAt(randomIndex);
    }
    return randomId;
}
exports.generateRandomId = generateRandomId;
const generateUniqueShortCode = () => __awaiter(void 0, void 0, void 0, function* () {
    while (true) {
        const shortCode = generateRandomId(5);
        const existingURL = yield url_model_1.urlModel.findOne({ shortCode });
        if (!existingURL) {
            return shortCode;
        }
    }
});
exports.generateUniqueShortCode = generateUniqueShortCode;
