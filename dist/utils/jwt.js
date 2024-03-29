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
exports.validateUserToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_KEY = process.env.JWT_SECRET;
const generateToken = (payload_1, ...args_1) => __awaiter(void 0, [payload_1, ...args_1], void 0, function* (payload, secret = JWT_KEY) {
    const token = jsonwebtoken_1.default.sign(payload, secret, { expiresIn: "24h" });
    return token;
});
exports.generateToken = generateToken;
const validateUserToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const key = JWT_KEY || "secret";
        const data = jsonwebtoken_1.default.verify(token, key);
        if (!data)
            return;
        return data;
    }
    catch (error) {
        console.error(error);
    }
});
exports.validateUserToken = validateUserToken;
