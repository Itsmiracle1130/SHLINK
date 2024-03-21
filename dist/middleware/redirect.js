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
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const url_model_1 = require("../model/url.model");
// Route for handling URL redirection
router.get('/:shortUrl', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find the URL by short URL
        const url = yield url_model_1.urlModel.findOne({ shortUrl: req.params.shortUrl });
        if (!url) {
            return res.status(404).send('URL not found');
        }
        // Increment click count
        url.clickCount++;
        yield url.save();
        // Redirect to the long URL
        res.redirect(url.longUrl);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}));
exports.default = router;
