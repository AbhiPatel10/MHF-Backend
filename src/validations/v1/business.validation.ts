import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";
import { sendResponse } from "../../utils/response";

@injectable()
export class BusinessValidator {

    getBusinessDetailsValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            userId: Joi.number().required()
                .messages({
                    'number.base': 'userId must be a digit.',
                    'any.required': 'userId is required.'
                }),
        }).validate(req.params);
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

    businessDetailsValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            businessId: Joi.number().required()
                .messages({
                    'number.base': 'businessId must be a digit.',
                    'any.required': 'businessId is required.'
                }),
        }).validate(req.params);
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

    getAllBusinessesValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            categoryId: Joi.number().optional()
                .messages({
                    'number.base': 'categoryId must be a digit.',
                }),
            subCategoryId: Joi.number().optional()
                .messages({
                    'number.base': 'subCategoryId must be a digit.',
                }),
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