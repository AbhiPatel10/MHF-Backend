import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";
import { injectable } from "tsyringe";

@injectable()
export class ServiceValidator {
    /**
     * Create service validator of service validator
     */
    createServiceValidator = (req: Request, res: Response, next: NextFunction) => {
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
            serviceName: Joi.string().min(3).max(50).required().messages({
                "string.base": `name should be a type of text`,
                "string.empty": `name cannot be empty`,
                "string.min": `name should have at least {#limit} characters`,
                "string.max": `name should not exceed {#limit} characters`,
                "any.required": `name is a required field`,
            }),
            description: Joi.string().min(3).max(50).required().messages({
                "string.base": `name should be a type of text`,
                "string.empty": `name cannot be empty`,
                "string.min": `name should have at least {#limit} characters`,
                "string.max": `name should not exceed {#limit} characters`,
                "any.required": `name is a required field`,
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
            })
        }
        next();
    };

    /**
     * Update service validator of service validator
     */
    updateServiceValidator = (req: Request, res: Response, next: NextFunction) => {
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
            serviceName: Joi.string().min(3).max(50).optional().messages({
                "string.base": `name should be a type of text`,
                "string.empty": `name cannot be empty`,
                "string.min": `name should have at least {#limit} characters`,
                "string.max": `name should not exceed {#limit} characters`,
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
            })
        }
        next();
    };

    /**
     * Get service details validator of service validator
     */
    getServiceDetailsValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            serviceId: Joi.number().required()
                .messages({
                    'number.base': 'serviceId must be a digit.',
                    'any.required': 'serviceId is required.'
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