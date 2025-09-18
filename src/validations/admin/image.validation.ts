import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";
import Joi from "joi";
import { sendResponse } from "../../utils/response";

@injectable()
export class ImageValidator {

    imageDeleteValidator = (req: Request, res: Response, next: NextFunction) => {
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
                data: null
            })
        }
        next();
    };
}