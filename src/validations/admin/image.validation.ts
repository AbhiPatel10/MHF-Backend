import { NextFunction, Request, Response } from "express";
import { injectable } from "tsyringe";
import Joi from "joi";
import { sendResponse } from "../../utils/response";

@injectable()
export class ImageValidator {

    imageDeleteValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            adminImageId: Joi.number().required().messages({
                "number.base": `adminImageId should be a number`,
                "any.required": `adminImageId is a required field`,
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