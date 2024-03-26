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
exports.getURLAnalytics = exports.viewLink = exports.viewLinks = exports.customURL = exports.shortenUrl = void 0;
const user_model_1 = require("../model/user.model");
const url_model_1 = require("../model/url.model");
const url_validator_1 = require("../validator/url.validator");
// import { successResponse,errorResponse, handleError } from "../utils/response";
const generateUrl_1 = require("../utils/generateUrl");
const qrcode_1 = __importDefault(require("qrcode"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const HOST = process.env.HOST;
const shortenUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const user = yield user_model_1.userModel.findById(_id);
        if (!user) {
            return res.status(401).send({
                status: false,
                message: "Please Login"
            });
        }
        const { error, value } = (0, url_validator_1.validateUrl)(req.body);
        if (error) {
            return res.status(400).send({
                status: false,
                message: error.message
            });
        }
        const { longURL } = value;
        const shortCode = yield (0, generateUrl_1.generateUniqueShortCode)();
        const shortURL = `${HOST}/url/${shortCode}`;
        const qrCodeDataURL = yield qrcode_1.default.toDataURL(shortURL);
        const newURL = yield url_model_1.urlModel.create({
            username: user.username,
            shortCode,
            longUrl: longURL,
            shortUrl: shortURL,
            QRCode: qrCodeDataURL
        });
        return res.status(201).render("viewUrl", {
            newURL
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            status: false,
            message: "Failed to create shortened URL"
        });
    }
});
exports.shortenUrl = shortenUrl;
const customURL = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const { error, value } = (0, url_validator_1.validateCustomUrl)(req.body);
        if (error) {
            return res.status(400).send({
                status: false,
                message: error.message
            });
        }
        const { shortCode, longURL } = value;
        const existingURL = yield url_model_1.urlModel.findOne({ shortCode });
        if (existingURL) {
            return res.status(409).send({
                status: false,
                message: "Short code already in use, please try another"
            });
        }
        const shortURL = `${HOST}/url/${shortCode}`;
        const qrCodeDataURL = yield qrcode_1.default.toDataURL(shortURL);
        const user = yield user_model_1.userModel.findById(_id);
        if (!user) {
            return res.status(401).send({
                status: false,
                message: "Kindly Login"
            });
        }
        const newURL = yield url_model_1.urlModel.create({
            username: user.username,
            shortCode,
            longUrl: longURL,
            shortUrl: shortURL,
            QRCode: qrCodeDataURL
        });
        return res.status(201).render("customUrl", {
            newURL
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            status: false,
            message: "Failed to create custom shortened URL"
        });
    }
});
exports.customURL = customURL;
const viewLinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.user;
        const user = yield user_model_1.userModel.findById(_id);
        if (!user) {
            return res.status(401).send({
                status: false,
                message: "Please Login"
            });
        }
        const URLs = yield url_model_1.urlModel.find({ username: user.username });
        console.log(URLs);
        const shortURLs = URLs.map(url => ({ shortUrl: url.shortUrl, longUrl: url.longUrl, shortCode: url.shortCode }));
        return res.status(200).render("viewAllUrls", {
            shortURLs, user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            status: false,
            message: "Failed to fetch shortened URLs"
        });
    }
});
exports.viewLinks = viewLinks;
const viewLink = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortCode } = req.params;
        const shortCodeCheck = yield url_model_1.urlModel.findOne({ shortCode });
        if (!shortCodeCheck) {
            return res.status(409).send({
                status: false,
                message: "Invalid shortened URL"
            });
        }
        shortCodeCheck.clickCount += 1;
        const ipAddress = req.ip || "Unknown";
        const newClick = {
            timestamp: new Date(),
            ipAddress: ipAddress,
            userAgent: req.headers["user-agent"] || "Unknown"
        };
        shortCodeCheck.clicks.push(newClick);
        yield shortCodeCheck.save();
        res.status(302).redirect(shortCodeCheck.longUrl);
    }
    catch (error) {
        console.error(error);
        return res.status(500).send({
            status: false,
            message: "Failed to redirect to the original URL"
        });
    }
});
exports.viewLink = viewLink;
const getURLAnalytics = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { shortCode } = req.params;
        const shortCodeCheck = yield url_model_1.urlModel.findOne({ shortCode }).select("-QRCode");
        if (!shortCodeCheck) {
            return res.status(409).send({
                status: false,
                message: "Invalid shortened URL"
            });
        }
        return res.status(200).render("analytics", {
            shortCodeCheck
        });
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            message: "Failed to fetch URL analytics"
        });
    }
});
exports.getURLAnalytics = getURLAnalytics;
