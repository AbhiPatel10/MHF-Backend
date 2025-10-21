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
