import { NextFunction, Response, Request } from 'express';
import Joi from 'joi';
import { sendResponse } from '../../utils/response';
import { injectable } from 'tsyringe';

@injectable()
export class GalleryValidator {
  /**
   * Update gallery validator
   */
  updateGalleryValidator(req: Request, res: Response, next: NextFunction) {
    const { error } = Joi.object({
      image: Joi.string().required().messages({
        'any.required': 'Image is required',
        'string.empty': 'Image cannot be empty',
      }),
      altText: Joi.string().optional().allow(''),
      imageDescription: Joi.string().optional().allow(''),
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
  }
}
