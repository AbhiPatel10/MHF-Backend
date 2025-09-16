import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";
import { injectable } from "tsyringe";

@injectable()
export class AuthValidator {
    createAdminValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            email: Joi.string().email().required().messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required',
            }),
            password: Joi.string().min(8).required().messages({
                'string.min': 'Password must be at least 8 characters long',
                'any.required': 'Password is required',
            }),
        }).validate(req.body);
        if (error) {
            return sendResponse({
                res,
                status: 400,
                message: error.details[0].message,
                data: null
            })
        }

        next();
    };

    adminLoginValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            email: Joi.string().email().required().messages({
                'string.email': 'Please provide a valid email address',
                'any.required': 'Email is required',
            }),
            password: Joi.string().min(8).required().messages({
                'string.min': 'Password must be at least 8 characters long',
                'any.required': 'Password is required',
            }),
        }).validate(req.body);
        if (error) {
            const errors = error.details.map((err) => err.message);
            return sendResponse({
                res,
                status: 400,
                message: error.details[0].message,
                data: null
            })
        }

        next();
    };
}