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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.registerUser = exports.loginUser = void 0;
const bcrypt_1 = require("../utils/bcrypt");
const jwt_1 = require("../utils/jwt");
const user_validator_1 = require("../validator/user.validator");
const user_model_1 = require("../model/user.model");
const logger_1 = __importDefault(require("../logging/logger"));
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { error, value } = (0, user_validator_1.validatelogin)(req.body);
            if (error) {
                return res.status(400).send({
                    status: false,
                    message: error.message
                });
            }
            const { emailUsername, password } = value;
            const user = yield user_model_1.userModel.findOne({
                $or: [{
                        email: emailUsername
                    }, {
                        username: emailUsername
                    }]
            });
            if (!user) {
                return res.status(409).send({
                    status: false,
                    message: "Invalid User details"
                });
            }
            const passwordCheck = yield (0, bcrypt_1.comparePassword)(password, user.password);
            if (!passwordCheck) {
                return res.status(409).send({
                    status: false,
                    message: "Invalid user details"
                });
            }
            const token = yield (0, jwt_1.generateToken)({
                id: user._id,
                email: user.email
            });
            res.cookie("token", token, { httpOnly: true });
            const _a = user.toObject(), { password: removedPassword } = _a, userData = __rest(_a, ["password"]);
            return res.status(200).render(("createUrl"), {
                status: true,
                message: "User signin successful",
                data: { token, userData }
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).send({
                status: false,
                message: "Internal server error"
            });
        }
    });
}
exports.loginUser = loginUser;
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Handles user registration
        try {
            const { error, value } = (0, user_validator_1.validateSignup)(req.body);
            if (error) {
                return res.status(400).send({
                    status: false,
                    message: error.message
                });
            }
            const { email, username, password } = value;
            const userExist = yield user_model_1.userModel.findOne({ $or: [{ email }, { username }] });
            if (userExist) {
                return res.status(409).send({
                    status: false,
                    message: "User with these details already exists"
                }).redirect('/login');
            }
            const hashedPassword = yield (0, bcrypt_1.hashPassword)(password);
            yield user_model_1.userModel.create({
                email,
                username,
                password: hashedPassword
            });
            return res.status(200).render(('login'), {
                status: true,
                message: "User account created successfully"
            });
        }
        catch (error) {
            console.error(error);
            return res.status(500).send({
                status: false,
                message: "Internal server error"
            });
        }
    });
}
exports.registerUser = registerUser;
const logoutUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token");
        return res.status(440).render("landingPage");
    }
    catch (error) {
        logger_1.default.error(`Logout error: ${error.message}`);
        return res.status(500).send({
            status: false,
            message: "Internal server error"
        });
    }
});
exports.logoutUser = logoutUser;
exports.default = { loginUser, registerUser, logoutUser: exports.logoutUser };
