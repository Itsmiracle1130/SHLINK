"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const router = (0, express_1.Router)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 0.5 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
});
router.use("/login", limiter);
router.get("/login", (req, res) => {
    res.render('login');
});
router.get("/signup", (req, res) => {
    res.render('signup');
});
router.post("/signup", user_controller_1.registerUser); //register a new user
router.post("/login", user_controller_1.loginUser); //login a user
router.get("/logout", user_controller_1.logoutUser); //logout a user
exports.default = router;
