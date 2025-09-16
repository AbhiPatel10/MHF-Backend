import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";
import { injectable } from "tsyringe";

@injectable()
export class ProductValidator {
    /**
     * create product validator
     */
    createProductValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            images: Joi.array()
                .items(
                    Joi.number().integer().positive().messages({
                        "number.base": "Each image ID must be a number",
                        "number.integer": "Image ID must be an integer",
                        "number.positive": "Image ID must be greater than 0",
                    })
                )
                .optional()
                .messages({
                    "array.base": "Images must be an array of numbers",
                    "array.min": "At least one image ID is required",
                }),
            productName: Joi.string().min(3).max(50).required().messages({
                "string.base": `productName should be a type of text`,
                "string.empty": `productName cannot be empty`,
                "string.min": `productName should have at least {#limit} characters`,
                "string.max": `productName should not exceed {#limit} characters`,
                "any.required": `productName is a required field`,
            }),
            description: Joi.string().min(3).max(200).required().messages({
                "string.base": `description should be a type of text`,
                "string.empty": `description cannot be empty`,
                "string.min": `description should have at least {#limit} characters`,
                "string.max": `description should not exceed {#limit} characters`,
                "any.required": `description is a required field`,
            }),
            price: Joi.number().optional().allow(null).messages({
                "number.base": `Price should be a number`,
            }),
            gstPercentage: Joi.number()
                .min(0)
                .max(100)
                .optional()
                .messages({
                    'number.base': 'GST percentage must be a number',
                    'number.min': 'GST percentage cannot be less than 0',
                    'number.max': 'GST percentage cannot be more than 100',
                }),
            rateInclusive: Joi.boolean()
                .optional()
                .messages({
                    'boolean.base': 'Rate inclusive must be true or false',
                }),
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

    /**
     * Update product validator of product validator
     */
    updateProductValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            images: Joi.array()
                .items(
                    Joi.number().integer().positive().messages({
                        "number.base": "Each image ID must be a number",
                        "number.integer": "Image ID must be an integer",
                        "number.positive": "Image ID must be greater than 0",
                    })
                )
                .optional()
                .messages({
                    "array.base": "Images must be an array of numbers",
                    "array.min": "At least one image ID is required",
                }),
            productName: Joi.string().min(3).max(50).optional().messages({
                "string.base": `productName should be a type of text`,
                "string.empty": `productName cannot be empty`,
                "string.min": `productName should have at least {#limit} characters`,
                "string.max": `productName should not exceed {#limit} characters`,
            }),
            description: Joi.string().min(3).max(200).optional().messages({
                "string.base": `description should be a type of text`,
                "string.empty": `description cannot be empty`,
                "string.min": `description should have at least {#limit} characters`,
                "string.max": `description should not exceed {#limit} characters`,
            }),
            price: Joi.number().optional().allow(null).messages({
                "number.base": `Price should be a number`,
            }),
            gstPercentage: Joi.number()
                .min(0)
                .max(100)
                .optional()
                .messages({
                    'number.base': 'GST percentage must be a number',
                    'number.min': 'GST percentage cannot be less than 0',
                    'number.max': 'GST percentage cannot be more than 100',
                }),
            rateInclusive: Joi.boolean()
                .optional()
                .messages({
                    'boolean.base': 'Rate inclusive must be true or false',
                }),
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

    paramsProductIdValidator = (req: Request, res: Response, next: NextFunction) => {
        const schemaParams = Joi.object({
            productId: Joi.number().integer().min(1).required().messages({
                'number.base': 'productId must be a number',
                'number.integer': 'productId must be an integer',
                'number.min': 'productId must be at least 1',
                'any.required': 'productId is required.'
            }),
        });

        const { error: errorParams } = schemaParams.validate(req.params);
        if (errorParams)
            return sendResponse({
                res,
                status: 400,
                data: null,
                message: errorParams.details[0].message
            })
        next();
    };

    /**
     * Get product details validator of product validator
     */
    getProductDetailsValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            productId: Joi.number().required().messages({
                'number.base': 'productId must be a digit.',
                'any.required': 'productId is required.'
            }),
        }).validate(req.params);

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
