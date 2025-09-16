import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";
import { injectable } from "tsyringe";

@injectable()
export class UserValidator {

    updateUserValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            name: Joi.string().min(3).max(50).optional(),
            imageId: Joi.number().optional()
        }).validate(req.body);

        if (error) {
            return sendResponse({
                res,
                status: 400,
                message: error.details[0].message,
                data: null
            });
        }
        next();
    };
}