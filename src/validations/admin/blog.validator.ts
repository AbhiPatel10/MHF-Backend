import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";

export class BlogValidator {
    createBlogValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            title: Joi.string().min(3).max(150).required(),
            category: Joi.string().required(), // Reference to category table
            author: Joi.string().optional(), // Reference to category table
            image: Joi.string().optional(),
            authorImage: Joi.string().optional(),
            content: Joi.object().required(), // Editor.js JSON
            isDraft: Joi.boolean().default(false),
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
    updateBlogValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            title: Joi.string().min(3).max(150).required(),
            category: Joi.string().required(), // Reference to category table
            image: Joi.string().optional(),
            author: Joi.string().optional(), // Reference to category table
            authorImage: Joi.string().optional(),
            content: Joi.object().required(), // Editor.js JSON
            isDraft: Joi.boolean().default(false),
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
    paramsBlogValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            id: Joi.string().required().messages({
                "string.base": "id should be a string",
                "any.required": "id is a required field",
            }),
        }).validate(req.params);

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

    getAllBlogsValidator = (req: Request, res: Response, next: NextFunction) => {
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
