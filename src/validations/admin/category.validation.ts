import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";
import { injectable } from "tsyringe";

@injectable()
export class CategoryValidator {
    createCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            category: Joi.string().required().messages({
                'any.required': 'category is required',
            }),
            adminImageId: Joi.number()
                .integer()
                .positive()
                .optional()
                .allow(null)
                .messages({
                    "number.base": "Admin Image ID must be a number",
                    "number.integer": "Admin Image ID must be an integer",
                    "number.positive": "Admin Image ID must be greater than 0",
                }),
            categoryAlias: Joi.array().items(Joi.string()).optional().min(0)
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
            return sendResponse({
                res,
                status: 400,
                message: error.details[0].message,
                data: null
            })
        }
        next();
    };

    getAllSubCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
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

        const { error: errorParams } = Joi.object({
            categoryId: Joi.number().required().messages({
                'any.required': "categoryId is required"
            }),
        }).validate(req.params);

        if (errorParams) {
            return sendResponse({
                res,
                status: 400,
                message: errorParams.details[0].message,
                data: null
            })
        }
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

    getCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            categoryId: Joi.number().integer().positive().required().messages({
                "number.base": "Category ID must be a number",
                "number.integer": "Category ID must be an integer",
                "number.positive": "Category ID must be greater than 0",
                "any.required": "Category ID is required"
            })
        }).validate(req.params); // 👈 we’ll pass it via route param `/category/:categoryId`

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

    activeInactiveCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            categoryId: Joi.number().required().messages({
                'any.required': "categoryId is required"
            }),
            isActive: Joi.boolean().required().messages({
                "boolean.base": "Is active should be a type of boolean",
                "any.required": "isActive is required"
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

    updateCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            categoryId: Joi.number().required().messages({
                'any.required': "categoryId is required"
            }),
            category: Joi.string().required().messages({
                'any.required': 'category is required',
            }),
            categoryAlias: Joi.array().items(Joi.string()).optional().min(0),
            adminImageId: Joi.number()
                .integer()
                .positive()
                .optional()
                .allow(null)
                .messages({
                    "number.base": "Admin Image ID must be a number",
                    "number.integer": "Admin Image ID must be an integer",
                    "number.positive": "Admin Image ID must be greater than 0",
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

    createSubCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            categoryId: Joi.number().required().messages({
                'any.required': "categoryId is required"
            }),
            subCategory: Joi.string().required().messages({
                'any.required': 'subCategory is required',
            }),
            adminImageId: Joi.number()
                .integer()
                .positive()
                .optional()
                .allow(null)
                .messages({
                    "number.base": "Admin Image ID must be a number",
                    "number.integer": "Admin Image ID must be an integer",
                    "number.positive": "Admin Image ID must be greater than 0",
                }),
            subCategoryAlias: Joi.array().items(Joi.string()).optional().min(0)
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

    updateSubCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            subCategoryId: Joi.number().required().messages({
                'any.required': "subCategoryId is required"
            }),
            subCategory: Joi.string().required().messages({
                'any.required': 'subCategory is required',
            }),
            adminImageId: Joi.number()
                .integer()
                .positive()
                .optional()
                .allow(null)
                .messages({
                    "number.base": "Admin Image ID must be a number",
                    "number.integer": "Admin Image ID must be an integer",
                    "number.positive": "Admin Image ID must be greater than 0",
                }),
            subCategoryAlias: Joi.array().items(Joi.string()).optional().min(0)
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

    getSubCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            subCategoryId: Joi.number().integer().positive().required().messages({
                "number.base": "subCategoryId must be a number",
                "number.integer": "subCategoryId must be an integer",
                "number.positive": "subCategoryId must be greater than 0",
                "any.required": "subCategoryId is required"
            })
        }).validate(req.params); // 👈 we’ll pass it via route param `/category/:categoryId`

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

    activeInactiveSubCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            subCategoryId: Joi.number().required().messages({
                'any.required': "subCategoryId is required"
            }),
            isActive: Joi.boolean().required().messages({
                "boolean.base": "Is active should be a type of boolean",
                "any.required": "isActive is required"
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

    softDeleteCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            categoryId: Joi.number().required().messages({
                'any.required': "categoryId is required"
            })
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

    softDeleteSubCategoryValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            subCategoryId: Joi.number().required().messages({
                'any.required': "subCategoryId is required"
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

}