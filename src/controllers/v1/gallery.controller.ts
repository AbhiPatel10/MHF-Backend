import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';

import { GalleryService } from '../../services/v1/gallery.service';
import { handleControllerError } from '../../utils/errorHandler';
import { sendResponse } from '../../utils/response';

@injectable()
export class GalleryController {
  constructor(
    @inject(GalleryService) private readonly galleryService: GalleryService,
  ) { }

  // Gallery Images List
  getGalleryImagesController = async (req: Request, res: Response) => {
    try {
      const { offset, limit }: { offset?: string; limit?: string } = req.query;
      const { success, message, data } =
        await this.galleryService.GetAllImageToGalleryService({
          offset: offset ?? '0',
          limit: limit ?? '10',
        });

      return sendResponse({
        res,
        status: success ? 200 : 400,
        message,
        data,
      });
    } catch (error) {
      console.error('Error in Remove Image To GalleryController:', error);
      handleControllerError(error, res);
    }
  };
}
