import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";

export class ContactValidator {

    updateStatusValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            isContacted: Joi.boolean().required(),
        }).validate(req.body);

        if (error) {
            return sendResponse({ res, status: 400, message: error.details[0].message, data: null });
        }
        next();
    };

    paramsContactValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            id: Joi.string().required(),
        }).validate(req.params);

        if (error) {
            return sendResponse({ res, status: 400, message: error.details[0].message, data: null });
        }
        next();
    };

    getAllContactsValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            limit: Joi.number().optional(),
            offset: Joi.number().optional(),
            search: Joi.string().optional().allow(""),
            isContacted: Joi.boolean().optional()
        }).validate(req.query);

        if (error) {
            return sendResponse({ res, status: 400, message: error.details[0].message, data: null });
        }
        next();
    };
}
