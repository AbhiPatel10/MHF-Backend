import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";
import { injectable } from "tsyringe";
import mongoose from "mongoose";
import { TeamMemberTypes } from "../../types/admin/teamMembers.types";

@injectable()
export class TeamMemberValidator {
    /**
     * Create team member validator
     */
    createTeamMemberValidator = (req: Request, res: Response, next: NextFunction) => {
        console.log("req---", req.body)
        const { error } = Joi.object({
            name: Joi.string().required().messages({
                'any.required': 'Name is required',
                'string.empty': 'Name cannot be empty'
            }),
            address: Joi.object({
                city: Joi.string().optional().messages({
                    'any.required': 'City is required',
                    'string.empty': 'City cannot be empty'
                }),
                state: Joi.string().optional().messages({
                    'any.required': 'State is required',
                    'string.empty': 'State cannot be empty'
                }),
                postalCode: Joi.string().optional().messages({
                    'any.required': 'Postal Code is required',
                    'string.empty': 'Postal Code cannot be empty'
                }),
            }).required().messages({
                'any.required': 'Address is required'
            }),
            bloodGroup: Joi.string().optional().allow("").messages({
                'any.required': 'Blood Group is required',
                'string.empty': 'Blood Group cannot be empty'
            }),
            role: Joi.string().optional().messages({
                'any.required': 'Blood Group is required',
                'string.empty': 'Blood Group cannot be empty'
            }),
            birthdate: Joi.date().iso().optional().allow("").messages({
                'any.required': 'Birthdate is required',
                'date.format': 'Birthdate must be in ISO format'
            }),
            phoneNo: Joi.string().optional().messages({
                'any.required': 'Phone number is required',
                'string.empty': 'Phone number cannot be empty'
            }),
            occupation: Joi.string().optional().messages({
                'any.required': 'Occupation is required',
                'string.empty': 'Occupation cannot be empty'
            }),
            skills: Joi.array().items(Joi.string()).min(0).optional(),
            memberType: Joi.string()
                .valid(TeamMemberTypes.ASSET, TeamMemberTypes.KEY_MEMBER, TeamMemberTypes.VOLUNTEER)
                .required()
                .messages({
                    'any.only': 'Member type must be one of: ASSET, KEY_MEMBER, VOLUNTEER',
                    'any.required': 'Member type is required'
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
            });
        }
        next();
    };

    /**
     * Update team member validator
     */
    updateTeamMemberValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            name: Joi.string().required().messages({
                'any.required': 'Name is required',
                'string.empty': 'Name cannot be empty'
            }),
            address: Joi.object({
                city: Joi.string().optional().messages({
                    'string.empty': 'City cannot be empty'
                }),
                state: Joi.string().optional().messages({
                    'string.empty': 'State cannot be empty'
                }),
                postalCode: Joi.string().optional().messages({
                    'string.empty': 'Postal Code cannot be empty'
                }),
            }).optional(),
            bloodGroup: Joi.string().optional().messages({
                'string.empty': 'Blood Group cannot be empty'
            }),
            role: Joi.string().optional().messages({
                'any.required': 'Role is required',
                'string.empty': 'Role cannot be empty'
            }),
            birthdate: Joi.date().iso().optional().messages({
                'date.format': 'Birthdate must be in ISO format'
            }),
            phoneNo: Joi.string().optional().messages({
                'any.required': 'Phone number is required',
                'string.empty': 'Phone number cannot be empty'
            }),
            occupation: Joi.string().optional().messages({
                'any.required': 'Occupation is required',
                'string.empty': 'Occupation cannot be empty'
            }),
            skills: Joi.array().items(Joi.string()).min(0).optional(),
            memberType: Joi.string()
                .valid(TeamMemberTypes.ASSET, TeamMemberTypes.KEY_MEMBER, TeamMemberTypes.VOLUNTEER)
                .required()
                .messages({
                    'any.only': 'Member type must be one of: ASSET, KEY_MEMBER, VOLUNTEER',
                    'any.required': 'Member type is required'
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
            });
        }
        next();
    };
}
