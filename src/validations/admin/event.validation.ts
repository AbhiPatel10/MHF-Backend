import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";

export class EventValidator {
    createEventValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            name: Joi.string().min(3).max(100).required(),
            category: Joi.string().required(),
            date: Joi.date().required(),
            location: Joi.string().min(3).required(),
            image: Joi.string().optional(),
            description: Joi.object().optional(), // Editor.js JSON
        }).validate(req.body);

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
