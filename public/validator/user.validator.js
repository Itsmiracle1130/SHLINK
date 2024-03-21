"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatelogin = exports.validateSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const options = {
    stripUnknown: true,
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        },
    },
};
const validateSignup = (user) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().required(),
        email: joi_1.default.string().required().email(),
        password: joi_1.default.string().required().min(6).max(32)
    });
    return schema.validate(user);
};
exports.validateSignup = validateSignup;
const validatelogin = (login) => {
    const schema = joi_1.default.object({
        emailUsername: joi_1.default.string().required(),
        password: joi_1.default.string().required().min(6).max(32)
    });
    return schema.validate(login);
};
exports.validatelogin = validatelogin;
