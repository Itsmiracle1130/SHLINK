import { Request, Response, Router } from "express";
import { hashPassword, comparePassword } from "../utils/bcrypt"
import {generateToken, validateUserToken} from "../utils/jwt"
import { validateSignup, validatelogin } from "../validator/user.validator"
import { userModel } from "../model/user.model"
import mongoose, { Document } from "mongoose";
import logger from '../logging/logger'


interface userDocument extends Document {
  email: string;
  password: string;
  urls: mongoose.Schema.Types.ObjectId[];
}

export async function loginUser(req: Request, res: Response) {
  try {
		const { error, value } = validatelogin(req.body);
		if(error) {
			return res.status(400).send({
				status: false,
				message: error.message
			});
		}
		const { emailUsername, password } = value;
		const user = await userModel.findOne({
			$or: [{
				email: emailUsername
			}, {
				username: emailUsername
			}]
		});
		if(!user) {
			return res.status(409).send({
				status: false,
				message: "Invalid User details"
			});
		}
		const passwordCheck = await comparePassword(password, user.password);
		if(!passwordCheck) {
			return res.status(409).send({
				status: false,
				message: "Invalid user details"
			});
		}
		const token = await generateToken({
			id: user._id,
			email: user.email
		});
    res.cookie("token", token, { httpOnly: true });
		const { password: removedPassword, ...userData } = user.toObject();
		return res.status(200).render(("dashboard"),{
			userData, user
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			status: false,
			message: "Internal server error"
		});
	}
}

export async function registerUser( req: Request, res: Response) {
    
    // Handles user registration
    try {
      const { error, value } = validateSignup(req.body);
      if(error) {
        return res.status(400).send({
          status: false,
          message: error.message
        });
      }
      const { email, username, password } = value;
      const userExist = await userModel.findOne({ $or: [{ email }, { username }] });
      if (userExist) {
        return res.status(409).send({
          status: false,
          message: "User with these details already exists"
        }).redirect('/login');
      }
  
      const hashedPassword = await hashPassword(password);
      await userModel.create({
        email,
        username,
        password: hashedPassword
      });
      return res.status(200).render(('login'),{
        status: true,
        message: "User account created successfully"
      })
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: false,
        message: "Internal server error"
      });
    }
  }

  export const logoutUser = async (req: Request, res: Response) => {
    try {
      res.clearCookie("token");
      return res.status(440).render("landingPage");
    } catch (error: any) {
      logger.error(`Logout error: ${error.message}`);
      return res.status(500).send({
        status: false,
        message: "Internal server error"
      });
    }
  };
  export default {loginUser, registerUser, logoutUser};