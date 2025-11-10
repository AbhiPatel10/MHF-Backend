import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";

export class VolunteerApplicationValidator {
  applyAsVolunteerValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      fullName: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
          "string.empty": "Full name is required.",
          "string.min": "Full name must have at least 2 characters.",
          "string.max": "Full name cannot exceed 100 characters.",
        }),

      email: Joi.string()
        .email()
        .required()
        .messages({
          "string.email": "Please enter a valid email address.",
          "string.empty": "Email is required.",
        }),

      countryCode: Joi.string()
        .pattern(/^\+\d{1,4}$/)
        .required()
        .messages({
          "string.pattern.base": "Country code must be in the format +XX (e.g., +91).",
          "string.empty": "Country code is required.",
        }),

      phone: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .required()
        .messages({
          "string.pattern.base": "Phone number must contain 10–15 digits.",
          "string.empty": "Phone number is required.",
        }),

      whatsapp: Joi.string()
        .pattern(/^[0-9]{10,15}$/)
        .optional()
        .allow("")
        .messages({
          "string.pattern.base": "WhatsApp number must contain 10–15 digits.",
        }),

      bloodGroup: Joi.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .optional()
        .allow("")
        .messages({
          "any.only": "Please select a valid blood group.",
        }),

      address: Joi.string()
        .required()
        .messages({
          "string.base": "Address must be a string.",
          "string.empty": "Address is required.",
        }),

      city: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
          "string.empty": "City is required.",
          "string.min": "City must have at least 2 characters.",
        }),

      state: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
          "string.empty": "State is required.",
          "string.min": "State must have at least 2 characters.",
        }),

      country: Joi.string()
        .min(2)
        .max(100)
        .required()
        .messages({
          "string.empty": "Country is required.",
          "string.min": "Country must have at least 2 characters.",
        }),

      reason: Joi.string()
        .max(500)
        .optional()
        .allow("")
        .messages({
          "string.max": "Reason must not exceed 500 characters.",
        }),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return sendResponse({
        res,
        status: 400,
        message: error.details[0].message,
        data: null,
      });
    }

    next();
  };
}
