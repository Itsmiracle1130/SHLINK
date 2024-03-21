import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { PayloadInterface } from "./Interface";
dotenv.config()

const JWT_KEY = process.env.JWT_SECRET

export const generateToken = async (
	payload: JwtPayload,
	secret = JWT_KEY
) => {
	const token = jwt.sign(payload, secret as string, { expiresIn: "24h" });
	return token;
};

export const validateUserToken = async (token: string) => {
	try {
		const key = JWT_KEY || "secret";
		const data = jwt.verify(token, key) as PayloadInterface;
		if (!data) return;
		return data;
	} catch (error) {
		console.error(error);
	}
};