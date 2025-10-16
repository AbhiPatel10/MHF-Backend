import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { sendResponse } from '../../utils/response';

export class ContactValidator {
  createContactValidator = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = Joi.object({
      name: Joi.string().min(2).max(50).required(),
      email: Joi.string().email().required(),
      phoneNo: Joi.string().min(8).max(15).required(),
      subject: Joi.string().min(2).max(100).required(),
      message: Joi.string().min(5).max(500).required(),
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
