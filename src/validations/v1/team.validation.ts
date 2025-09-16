import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";
import { injectable } from "tsyringe";

@injectable()
export class TeamMemberValidator {

    // ✅ Add Team Member Validator
    addTeamMemberValidator = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            name: Joi.string().required().messages({
                "string.base": `name must be text`,
                "string.empty": `name cannot be empty`,
                "any.required": `name is a required field`,
            }),

            qualification: Joi.string().optional().messages({
                "string.base": `qualification must be text`,
            }),

            specialization: Joi.string().optional().messages({
                "string.base": `specialization must be text`,
            }),

            experience: Joi.string().optional().messages({
                "string.base": `experience must be text (e.g., "5 years" or "3 years 6 months")`,
            }),

            about: Joi.string().optional().messages({
                "string.base": `about must be text`,
            }),

            imageId: Joi.number().optional().messages({
                "number.base": `imageId must be a number`,
            }),
        });

        const { error } = schema.validate(req.body);
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


    // ✅ Update Team Member Validator
    updateTeamMemberValidator = (req: Request, res: Response, next: NextFunction) => {
        const schema = Joi.object({
            name: Joi.string().required().messages({
                "string.base": `name must be text`,
                "string.empty": `name cannot be empty`,
                "any.required": `name is a required field`,
            }),

            qualification: Joi.string().optional().messages({
                "string.base": `qualification must be text`,
            }),

            specialization: Joi.string().optional().messages({
                "string.base": `specialization must be text`,
            }),

            experience: Joi.string().optional().messages({
                "string.base": `experience must be text (e.g., "5 years" or "3 years 6 months")`,
            }),

            about: Joi.string().optional().messages({
                "string.base": `about must be text`,
            }),

            imageId: Joi.number().optional().messages({
                "number.base": `imageId must be a number`,
            }),

            createdBy: Joi.number().optional().messages({
                "number.base": `createdBy must be a number`,
            }),
        });

        const { error } = schema.validate(req.body);
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
     * Delete team member validator of team member validator
     */
    paramsTeamMemberIdValidator = (req: Request, res: Response, next: NextFunction) => {
        const schemaParams = Joi.object({
            teamMemberId: Joi.number().integer().min(1).required().messages({
                'number.base': 'teamMemberId must be a number',
                'number.integer': 'teamMemberId must be an integer',
                'number.min': 'teamMemberId must be at least 1',
                'any.required': 'teamMemberId is required.'
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
}
