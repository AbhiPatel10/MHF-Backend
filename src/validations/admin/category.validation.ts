import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";

export class CategoryValidator {
    createCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            name: Joi.string().min(2).max(50).required(),
        }).validate(req.body);

        if (error) {
            return sendResponse({ res, status: 400, message: error.details[0].message, data: null });
        }
        next();
    };

    updateCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            name: Joi.string().min(2).max(50).optional(),
            isActive: Joi.boolean().optional(),
        }).validate(req.body);

        if (error) {
            return sendResponse({ res, status: 400, message: error.details[0].message, data: null });
        }
        next();
    };

    getAllCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            limit: Joi.number().optional().messages({
                'number.base': 'limit should be a number',
            }),
            offset: Joi.number().optional().messages({
                'number.base': 'offset should be a number',
            }),
            search: Joi.string().optional().allow('').messages({
                'string.base': 'search should be a string',
            }),
        }).validate(req.query);

        if (error) {
            return sendResponse({ res, status: 400, message: error.details[0].message, data: null });
        }
        next();
    };

    paramsCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            id: Joi.string().required().messages({
                "string.base": "id should be a string",
                "any.required": "id is a required field",
            }),
        }).validate(req.params);

        if (error) {
            return sendResponse({ res, status: 400, message: error.details[0].message, data: null });
        }
        next();
    };
}
