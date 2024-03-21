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
exports.verifyToken = void 0;
const user_model_1 = require("../model/user.model");
const jwt_1 = require("../utils/jwt");
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token;
        if (req.headers && req.headers.authorization) {
            const parts = req.headers.authorization.split(" ");
            if (parts.length === 2 && /^Bearer$/i.test(parts[0])) {
                token = parts[1];
            }
            else {
                return res.status(401).send({
                    status: false,
                    message: "Invalid authorization format"
                });
            }
        }
        else if (req.headers && req.headers.cookie) {
            const cookies = req.headers.cookie.split("; ");
            const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
            if (tokenCookie) {
                token = tokenCookie.split("=")[1];
            }
            else {
                return res.status(401).send({
                    status: false,
                    message: "Token cookie not found"
                });
            }
        }
        if (!token) {
            return res.status(403).send({
                status: false,
                message: "Authorization not found"
            });
        }
        const decoded = yield (0, jwt_1.validateUserToken)(token);
        const user = yield user_model_1.userModel.findById(decoded.id);
        if (!user) {
            return res.status(404).send({
                status: false,
                message: "User account not found"
            });
        }
        req.user = user;
        next();
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: error.message
        });
    }
});
exports.verifyToken = verifyToken;
