import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { sendResponse } from "../../utils/response";
import { injectable } from "tsyringe";

@injectable()
export class ImageValidator {

    imageDeleteValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            imageId: Joi.number().required().messages({
                "number.base": `imageId should be a number`,
                "any.required": `imageId is a required field`,
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