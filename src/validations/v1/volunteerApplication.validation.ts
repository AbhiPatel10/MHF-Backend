import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";

export class VolunteerApplicationValidator {
  applyAsVolunteerValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      fullName: Joi.string().min(2).max(100).required(),
      email: Joi.string().email().required(),
      phone: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
          "string.pattern.base": "Phone number must be exactly 10 digits.",
        }),
      whatsapp: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .optional()
        .allow("")
        .messages({
          "string.pattern.base": "WhatsApp number must be exactly 10 digits.",
        }),
      bloodGroup: Joi.string().optional().allow(""),
      address: Joi.string().messages({
        "string.base": "Address must be a string.",
        "string.required": "Address is required.",
      }).required(),
      reason: Joi.string().max(500).optional().allow(""),
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
