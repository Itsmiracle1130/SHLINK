import { Request, Response, Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../model/user.model"
import mongoose, { Document } from "mongoose";
import logger from '../logging/logger'

interface userDocument extends Document {
  email: string;
  password: string;
  urls: mongoose.Schema.Types.ObjectId[];
}

export async function loginUser(req: Request, res: Response): Promise<void> {
  try {
    console.log("Login request received");
    // Check if user exists
    const user: userDocument | null = await userModel.findOne({
      email: req.body.email,
    });
    if (!user) {
      res.status(400).render(('login'), ({
        message: "Invalid email or password"
      }));
      // alert('User not found')
    } else {
      // Check if password is correct
      const validPass: boolean = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!validPass) {
        res.status(400).render(('login'), ({
          message: "Invalid email or password"
        }));
        // alert('Invalid password')
      } else {
        // Generate JWT
        const token: string = jwt.sign(
          { id: user._id, email: user.email },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "6h",
          }
        );
        // Save the token to a cookie and send a response
        res.cookie("token", token, { httpOnly: true });
        res.status(200).render( "createUrl");
      }return 
    }
  } catch (error: any) {
    logger.error(`Login error: ${error.message}`)
  }
}

export async function registerUser( req: Request, res: Response): Promise<any> {
    
    // Handles user registration
    try {
      const emailExist = await userModel.findOne({ email: req.body.email });
      const usernameExist = await userModel.findOne({ username: req.body.username });

      if (emailExist) {
        return res.status(400).json({ error: "Email has already been used." }).redirect('/signup');
      }
      if (usernameExist) {
        return res.status(400).json({ error: "Username has already been used." }).redirect('/signup');
      }
      if (!req.body.password) {
        return res.status(400).json({ error: "Password is required" }).redirect('/signup');
      }
  
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(201).render("login");
      
    } catch (error: any) {
      logger.error(`Signup error: ${error.message}`);
      return res.status(500).json({ error: "Internal server error" });
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