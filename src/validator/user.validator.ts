import Joi from "joi";
import { IUser, ILogin } from "../utils/Interface";

const options = {
	stripUnknown: true,
	abortEarly: false,
	errors: {
		wrap: {
			label: "",
		},
	},
};

export const validateSignup = (user: IUser) =>{
    const schema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6).max(32)
    })
    return schema.validate(user)
};

export const validatelogin = (login: ILogin) =>{
    const schema  = Joi.object({
        emailUsername: Joi.string().required(),
        password: Joi.string().required().min(6).max(32)
    })
    return schema.validate(login)
}
