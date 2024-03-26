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
const url_controller_1 = require("../controllers/url.controller");
const verifyToken_1 = require("../middleware/verifyToken");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const user_model_1 = require("../model/user.model");
const router = (0, express_1.Router)();
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 0.5 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
});
router.use("/shorten", limiter);
router.get("/shorten", verifyToken_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findOne({ email: req.user.email }).select("-password");
    res.render("createUrl", ({
        user
    }));
}));
router.get("/custom", verifyToken_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.render("customUrl");
}));
router.get("/dashboard", verifyToken_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.userModel.findOne({ email: req.user.email });
    res.render("dashboard", {
        user
    });
}));
router.post("/shorten", verifyToken_1.verifyToken, url_controller_1.shortenUrl);
router.post("/custom", verifyToken_1.verifyToken, url_controller_1.customURL);
router.get("/", verifyToken_1.verifyToken, url_controller_1.viewLinks);
router.get("/:shortCode", url_controller_1.viewLink);
router.get("/analytics/:shortCode", verifyToken_1.verifyToken, url_controller_1.getURLAnalytics);
exports.default = router;
