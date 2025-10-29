import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";
import { injectable } from "tsyringe";
import { VolunteerApplicationStatus } from "../../types/admin/volunteerApplication.types";

@injectable()
export class VolunteerApplicationValidator {
    /**
     * Update volunteer validator of volunteer validator
     */
    volunteerApplicationValidator = (req: Request, res: Response, next: NextFunction) => {

        const { error } = Joi.object({
            status: Joi.string()
                .valid(
                    VolunteerApplicationStatus.PENDING,
                    VolunteerApplicationStatus.APPROVED,
                    VolunteerApplicationStatus.REJECTED
                )
                .required()
                .messages({
                    'any.required': 'Status is required',
                    'string.empty': 'Status cannot be empty',
                    'any.only': `Status must be one of: ${Object.values(VolunteerApplicationStatus).join(', ')}`,
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

    volunteerApplicationParamsValidator = (req: Request, res: Response, next: NextFunction) => {

        const { error } = Joi.object({
            id: Joi.string().required().messages({
                'any.required': 'id is required',
                'string.empty': 'id cannot be empty'
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