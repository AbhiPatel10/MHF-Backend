import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { injectable } from "tsyringe";

@injectable()
export class CategoryValidator {
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
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ errors });
        }
        next();
    };

    getAllSubCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            categoryIds: Joi.array().items(Joi.string()).required().messages({
                'array.base': `categoryIds should be an array`,
                'array.includes': `categoryIds should only contain strings`,
                'any.required': `categoryIds is a required field`
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
            const errors = error.details.map((err) => err.message);
            return res.status(400).json({ errors });
        }
        next();
    };
}