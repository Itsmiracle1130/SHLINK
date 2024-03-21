import Joi from "joi";
import { CustomUrlInterface } from "../utils/Interface";

const options = {
	stripUnknown: true,
	abortEarly: false,
	errors: {
		wrap: {
			label: "",
		},
	},
};

export const validateUrl = (longURL: string) => {
	const urlInput = Joi.object({
		longURL: Joi.string().uri().required()
	});
	return urlInput.validate(longURL, options);
};

export const validateCustomUrl = ( customURL: CustomUrlInterface ) => {
	const customURLInput = Joi.object({
		shortCode: Joi.string().min(1).max(20).required(),
		longURL: Joi.string().uri().required()
	});
	return customURLInput.validate(customURL, options);
};