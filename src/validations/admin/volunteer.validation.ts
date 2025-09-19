import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";
import { injectable } from "tsyringe";
import mongoose from "mongoose";

@injectable()
export class VolunteerValidator {

    /**
     * Create volunteer validator of volunteer validator
     */
    createVolunteerValidator = (req: Request, res: Response, next: NextFunction) => {

        const { error } = Joi.object({
            name: Joi.string().required().messages({
                'any.required': 'Name is required',
                'string.empty': 'Name cannot be empty'
            }),
            address: Joi.object({
                city: Joi.string().required().messages({
                    'any.required': 'City is required',
                    'string.empty': 'City cannot be empty'
                }),
                state: Joi.string().required().messages({
                    'any.required': 'State is required',
                    'string.empty': 'State cannot be empty'
                }),
                postalCode: Joi.string().required().messages({
                    'any.required': 'Postal Code is required',
                    'string.empty': 'Postal Code cannot be empty'
                }),
            }).required().messages({
                'any.required': 'Address is required'
            }),
            bloodGroup: Joi.string().required().messages({
                'any.required': 'Blood Group is required',
                'string.empty': 'Blood Group cannot be empty'
            }),
            birthdate: Joi.date().iso().required().messages({
                'any.required': 'Birthdate is required',
                'date.format': 'Birthdate must be in ISO format'
            }),
            phoneNo: Joi.string().required().messages({
                'any.required': 'phoneNo is required',
                'string.empty': 'phoneNo cannot be empty'
            }),
            occupation: Joi.string().required().messages({
                'any.required': 'Occupation is required',
                'string.empty': 'Occupation cannot be empty'
            }),
            skills: Joi.array().items(Joi.string()).min(1).required().messages({
                'any.required': 'Skills are required',
                'array.min': 'At least one skill is required'
            }),
            image: Joi.string()
                .optional()
                .custom((value, helpers) => {
                    if (!mongoose.Types.ObjectId.isValid(value)) {
                        return helpers.error("any.invalid");
                    }
                    return value;
                })
                .messages({
                    "any.invalid": "Image must be a valid Mongo ObjectId"
                }),
            isActive: Joi.boolean().optional(),
            isDelete: Joi.boolean().optional(),
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
     * Update volunteer validator of volunteer validator
     */
    updateVolunteerValidator = (req: Request, res: Response, next: NextFunction) => {

        const { error } = Joi.object({
            name: Joi.string().required().messages({
                'any.required': 'Name is required',
                'string.empty': 'Name cannot be empty'
            }),
            address: Joi.object({
                city: Joi.string().required().messages({
                    'any.required': 'City is required',
                    'string.empty': 'City cannot be empty'
                }),
                state: Joi.string().required().messages({
                    'any.required': 'State is required',
                    'string.empty': 'State cannot be empty'
                }),
                postalCode: Joi.string().required().messages({
                    'any.required': 'Postal Code is required',
                    'string.empty': 'Postal Code cannot be empty'
                }),
            }).required().messages({
                'any.required': 'Address is required'
            }),
            bloodGroup: Joi.string().required().messages({
                'any.required': 'Blood Group is required',
                'string.empty': 'Blood Group cannot be empty'
            }),
            birthdate: Joi.date().iso().required().messages({
                'any.required': 'Birthdate is required',
                'date.format': 'Birthdate must be in ISO format'
            }),
            phoneNo: Joi.string().required().messages({
                'any.required': 'phoneNo is required',
                'string.empty': 'phoneNo cannot be empty'
            }),
            occupation: Joi.string().required().messages({
                'any.required': 'Occupation is required',
                'string.empty': 'Occupation cannot be empty'
            }),
            skills: Joi.array().items(Joi.string()).min(1).required().messages({
                'any.required': 'Skills are required',
                'array.min': 'At least one skill is required'
            }),
            image: Joi.string()
                .optional()
                .custom((value, helpers) => {
                    if (!mongoose.Types.ObjectId.isValid(value)) {
                        return helpers.error("any.invalid");
                    }
                    return value;
                })
                .messages({
                    "any.invalid": "Image must be a valid Mongo ObjectId"
                }),
            isActive: Joi.boolean().optional(),
            isDelete: Joi.boolean().optional(),
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
}