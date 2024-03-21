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
exports.generateQRCode = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
const fs_1 = __importDefault(require("fs"));
// Function to generate QR code
function generateQRCode(data, filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const qrCodeDataUrl = yield qrcode_1.default.toDataURL(data);
            // Convert Data URL to base64
            const base64Data = qrCodeDataUrl.replace(/^data:image\/png;base64,/, '');
            // Write QR code to file
            fs_1.default.writeFileSync(filePath, base64Data, 'base64');
            console.log('QR code generated successfully!');
        }
        catch (err) {
            console.error('Error generating QR code:', err);
        }
        generateQRCode(data, filePath);
    });
}
exports.generateQRCode = generateQRCode;
// Example usage
const data = 'https://example.com'; // Data you want to encode in QR code
const filePath = 'example.png'; // File path to save the generated QR code
