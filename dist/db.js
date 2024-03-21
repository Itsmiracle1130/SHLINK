"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logging/logger"));
dotenv_1.default.config();
const dbUrl = process.env.DBURL;
function connectMongoDb() {
    mongoose_1.default.connect(dbUrl);
    // { useNewUrlParser: true, useUnifiedTopology: true }
    mongoose_1.default.connection.on('connected', () => {
        console.log("MongoDB database connected successfully");
    });
    mongoose_1.default.connection.on('error', (err) => {
        logger_1.default.error(err.message);
    });
}
exports.default = connectMongoDb;
