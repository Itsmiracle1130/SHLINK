import { Request, Response } from "express";
import {userModel} from "../model/user.model"
import {urlModel} from "../model/url.model"
import {validateUrl, validateCustomUrl} from "../validator/url.validator"
// import { successResponse,errorResponse, handleError } from "../utils/response";
import { generateUniqueShortCode } from "../utils/generateUrl";
import qrCode from "qrcode"
import dotenv from "dotenv"
dotenv.config()
const HOST = process.env.HOST

export const shortenUrl = async (req: Request, res: Response) =>{
    try {
		const { _id } = req.user;
		const user = await userModel.findById(_id);
		if(!user) {
			return res.status(401).send({
				status: false,
				message: "Please Login"
			});
		}
		const { error, value } = validateUrl(req.body);
		if(error) {
			return res.status(400).send({
				status: false,
				message: error.message
			});
		}
		const { longURL } = value;
		const shortCode = await generateUniqueShortCode();
		const shortURL = `${HOST}/url/${shortCode}`;
		const qrCodeDataURL = await qrCode.toDataURL(shortURL);
		const newURL = await urlModel.create({
			username: user.username,
			shortCode,
			longUrl: longURL,
			shortUrl: shortURL,
			QRCode: qrCodeDataURL
		});
		
		return res.status(201).render("viewUrl",{
			newURL
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			status: false,
			message: "Failed to create shortened URL"
		});
	}
}

export const customURL = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user;
		const { error, value } = validateCustomUrl(req.body);
		if(error) {
			return res.status(400).send({
				status: false,
				message: error.message
			});
		}
		const { shortCode, longURL } = value;
		const existingURL = await urlModel.findOne({ shortCode });
		if (existingURL) {
			return res.status(409).send({
				status: false,
				message: "Short code already in use, please try another"
			});
		}
		const shortURL = `${HOST}/api/${shortCode}`;
		const qrCodeDataURL = await qrCode.toDataURL(shortURL);
		const user = await userModel.findById(_id);
		if(!user) {
			return res.status(401).send({
				status: false,
				message: "Kindly Login"
			});
		}
		const newURL = await urlModel.create({
			username: user.username,
			shortCode,
			longUrl: longURL,
			shortUrl: shortURL,
			QRCode: qrCodeDataURL
		});
		return res.status(201).render("customUrl", {
			newURL
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			status: false,
			message: "Failed to create custom shortened URL"
		});
	}
};

export const viewLinks = async (req: Request, res: Response) => {
	try {
		const { _id } = req.user;
		const user = await userModel.findById(_id);
		if(!user) {
			return res.status(401).send({
				status: false,
				message: "Please Login"
			});
		}
		const URLs = await urlModel.find({ username: user.username });
		const shortURLs = URLs.map(url => ({ shortUrl: url.shortUrl, longUrl: url.longUrl }));
		return res.status(200).send({
			status: true,
			message: "List of all shortened URLs is generated successfully",
			data: shortURLs
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			status: false,
			message: "Failed to fetch shortened URLs"
		});
	}
};

export const viewLink = async (req: Request, res: Response) => {
	try {
		const { shortCode } = req.params;
		const shortCodeCheck = await urlModel.findOne({ shortCode });
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
		await shortCodeCheck.save();

		res.status(302).redirect(shortCodeCheck.longUrl);
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			status: false,
			message: "Failed to redirect to the original URL"
		});
	}
};

export const getURLAnalytics = async (req: Request, res: Response) => {
	try {
		const { shortCode } = req.params;
		const shortCodeCheck = await urlModel.findOne({ shortCode }).select("-QRCode");
		if (!shortCodeCheck) {
			return res.status(409).send({
				status: false,
				message: "Invalid shortened URL"
			});
		}
		return res.status(200).send({
			status: true,
			message: "URL analytics fetched successfully",
			data: shortCodeCheck
		});
	} catch (error) {
		return res.status(500).send({
			status: false,
			message: "Failed to fetch URL analytics"
		});
	}
};