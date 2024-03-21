"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCustomUrl = exports.validateUrl = void 0;
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
const validateUrl = (longURL) => {
    const urlInput = joi_1.default.object({
        longURL: joi_1.default.string().uri().required()
    });
    return urlInput.validate(longURL, options);
};
exports.validateUrl = validateUrl;
const validateCustomUrl = (customURL) => {
    const customURLInput = joi_1.default.object({
        shortCode: joi_1.default.string().min(1).max(20).required(),
        longURL: joi_1.default.string().uri().required()
    });
    return customURLInput.validate(customURL, options);
};
exports.validateCustomUrl = validateCustomUrl;
