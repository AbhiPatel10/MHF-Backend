import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";
import { injectable } from "tsyringe";

@injectable()
export class AuthValidator {

    createUserValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            name: Joi.string().min(3).max(50).required().messages({
                "string.base": `name should be a type of text`,
                "string.empty": `name cannot be empty`,
                "string.min": `name should have at least {#limit} characters`,
                "string.max": `name should not exceed {#limit} characters`,
                "any.required": `name is a required field`,
            }),

            phoneNo: Joi.string()
                .pattern(/^[0-9]{10}$/) // 10-digit phone number
                .required()
                .messages({
                    "string.base": `phoneNo should be a type of text`,
                    "string.empty": `phoneNo cannot be empty`,
                    "string.pattern.base": `phoneNo must be a valid 10-digit number`,
                    "any.required": `phoneNo is a required field`,
                }),

            password: Joi.string().min(6).required().messages({
                "string.base": `password should be a type of text`,
                "string.empty": `password cannot be empty`,
                "string.min": `password should have at least {#limit} characters`,
                "any.required": `password is a required field`,
            }),

            repeatPassword: Joi.any()
                .valid(Joi.ref("password"))
                .required()
                .messages({
                    "any.only": `repeatPassword does not match password`,
                    "any.required": `repeatPassword is a required field`,
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

    loginUserValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            phoneNo: Joi.string()
                .pattern(/^[0-9]{10}$/) // 10-digit phone number
                .required()
                .messages({
                    "string.base": `phoneNo should be a type of text`,
                    "string.empty": `phoneNo cannot be empty`,
                    "string.pattern.base": `phoneNo must be a valid 10-digit number`,
                    "any.required": `phoneNo is a required field`,
                }),

            password: Joi.string().min(6).required().messages({
                "string.base": `password should be a type of text`,
                "string.empty": `password cannot be empty`,
                "string.min": `password should have at least {#limit} characters`,
                "any.required": `password is a required field`,
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

    sendOTPValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({

            phoneNo: Joi.string()
                .pattern(/^[0-9]{10}$/) // 10-digit phone number
                .required()
                .messages({
                    "string.base": `phoneNo should be a type of text`,
                    "string.empty": `phoneNo cannot be empty`,
                    "string.pattern.base": `phoneNo must be a valid 10-digit number`,
                    "any.required": `phoneNo is a required field`,
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

    forgotPasswordValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            phoneNo: Joi.string()
                .pattern(/^[0-9]{10}$/)
                .required()
                .messages({
                    "string.base": `phoneNo should be a type of text`,
                    "string.empty": `phoneNo cannot be empty`,
                    "string.pattern.base": `phoneNo must be a valid 10-digit number`,
                    "any.required": `phoneNo is a required field`,
                }),
            newPassword: Joi.string().min(6).required().messages({
                "string.base": `newPassword should be a type of text`,
                "string.empty": `newPassword cannot be empty`,
                "string.min": `newPassword should have at least {#limit} characters`,
                "any.required": `newPassword is a required field`,
            })
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
    verifyOTPValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({

            phoneNo: Joi.string()
                .pattern(/^[0-9]{10}$/) // 10-digit phone number
                .required()
                .messages({
                    "string.base": `phoneNo should be a type of text`,
                    "string.empty": `phoneNo cannot be empty`,
                    "string.pattern.base": `phoneNo must be a valid 10-digit number`,
                    "any.required": `phoneNo is a required field`,
                }),

            OTP: Joi.string()
                .length(6)
                .pattern(/^[0-9]{6}$/) // ensures numeric 6-digit OTP
                .required()
                .messages({
                    "string.base": `OTP should be a type of text`,
                    "string.empty": `OTP cannot be empty`,
                    "string.length": `OTP must be exactly {#limit} digits`,
                    "string.pattern.base": `OTP must contain only numbers`,
                    "any.required": `OTP is a required field`,
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
}