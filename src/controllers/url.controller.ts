import { Request, Response } from "express";
import {userModel} from "../model/user.model"
import {urlModel} from "../model/url.model"
import {validateUrl, validateShortenCode} from "../validator/url.validator"
import { successResponse,errorResponse, handleError } from "../utils/response";
import { generateRandomId } from "../utils/generateUrl";
import  {generateQRCode} from "../utils/qrCodeGenerator";
import dotenv from "dotenv"
dotenv.config()
const HOST = process.env.HOST

export const shortenUrl = async (req: Request, res: Response) =>{
    try {
        const {_id} = req.details;
        const user = await userModel.findById(_id);
        if(!user){
            return errorResponse(res,403, "User not found")
        }
        const {error, value } = validateUrl(req.body);
        if(error){
            return errorResponse(res, 409, error.message);
        }
        const {longUrl} = value;
        const shortCode = generateRandomId(4);
        const shortUrl =  `${HOST}/${shortCode}`;
        // const qrCode = await generateQRCode(shortUrl, "qrcode.png");

        
        const newUrl = await urlModel.create({
            shortCode,
            longUrl,
            shortUrl,
            // qrCode,
            userId: _id
        })
        return successResponse(res, 200, "Url shortning  successful", newUrl);

    } catch (error) {
        console.log(error);
        return errorResponse(res, 500, "Server error",)
    }
}
export const verifyUrl = async(req: Request, res: Response) =>{
    try {
        const {shortCode} = req.params
        const data = await urlModel.findOne({shortCode});
        if(!data){
            return errorResponse(res, 403, "Invalid short code")
        }
        const url = data.longUrl
        res.redirect(url)
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Server error")   
    }
} 
export const getUrlById = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params
        const url = await urlModel.find({userId});
        console.log(url)
        if(!url){
            return errorResponse(res, 404, "URL does not exist.");
        }
        return successResponse(res, 200, "Url fetched successfully", url);
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Server error")
    }
}
export const customiseUrl = async( req: Request, res: Response)=>{
    try {
        const {_id} = req.details;
        const user = await userModel.findById(_id);
        if(!user){
            return errorResponse(res,403, "User not found")
        }
        const {error, value } = validateShortenCode(req.body);
        if(error){
            return errorResponse(res, 409, error.message);
        }
        const {longUrl,shortCode} = value
        const existShortCode = await urlModel.findOne({shortCode});
        const shortUrl =  `${HOST}/${shortCode}`;
        if(existShortCode){
            return errorResponse(res, 409, "Short code exist already")
        };
        const urlData = await urlModel.create({
            longUrl,
            shortCode,
            shortUrl,
            userId : _id
        })
        return successResponse(res, 200, "Custom url created succesfully", urlData)
    } catch (error) {
        console.log(error)
        return errorResponse(res, 500, "Server error") 
    }
} 