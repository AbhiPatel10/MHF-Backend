import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../utils/response";

export class BusinessReviewValidator {
    addReviewValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            businessId: Joi.number().required().messages({
                "any.required": "businessId is required",
            }),
            rating: Joi.number().min(1).max(5).required().messages({
                "any.required": "rating is required",
                "number.min": "rating must be at least 1",
                "number.max": "rating cannot exceed 5",
            }),
            review: Joi.string().max(500).allow("").optional(),
        }).validate(req.body);

        if (error) {
            return sendResponse({
                res,
                status: 400,
                message: error.details[0].message,
                data: null,
            });
        }
        next();
    };

    updateReviewValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            reviewId: Joi.number().required().messages({
                "any.required": "reviewId is required",
            }),
            rating: Joi.number().min(1).max(5).required().messages({
                "any.required": "rating is required",
                "number.min": "rating must be at least 1",
                "number.max": "rating cannot exceed 5",
            }),
            review: Joi.string().max(500).allow("").optional(),
        }).validate(req.body);

        if (error) {
            return sendResponse({
                res,
                status: 400,
                message: error.details[0].message,
                data: null,
            });
        }
        next();
    };

    getAllReviewsValidator = (req: Request, res: Response, next: NextFunction) => {
        const { error } = Joi.object({
            businessId: Joi.number().required().messages({
                "any.required": "businessId is required",
            }),
        }).validate(req.body);

        if (error) {
            return sendResponse({
                res,
                status: 400,
                message: error.details[0].message,
                data: null,
            });
        }
        next();
    };
}
