import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";

export class NewsLetterValidator {

    getAllNewsLetterValidator = (req: Request, res: Response, next: NextFunction) => {
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
            sortOrder: Joi.string()
                .valid("asc", "desc")
                .optional()
                .messages({
                    "string.base": "sortOrder should be a string",
                    "any.only": "sortOrder must be either 'asc' or 'desc'",
                }),
        }).validate(req.query);

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
