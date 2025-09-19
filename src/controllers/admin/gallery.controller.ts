import { GalleryService } from '../../services/admin/gallery.service';
import { handleControllerError } from '../../utils/errorHandler';
import { sendResponse } from '../../utils/response';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GalleryController {
  constructor(
    @inject(GalleryService) private readonly galleryService: GalleryService
  ) {}

  //   update gallery
  addImageToGalleryController = async (req: Request, res: Response) => {
    try {
      const { image, altText } = req.body;
      const { success, message, data } =
        await this.galleryService.AddImageToGalleryService({ image, altText });
      return sendResponse({
        res,
        status: success ? 200 : 400,
        message,
        data,
      });
    } catch (error) {
      console.error('Error in updateGallaryController:', error);
      handleControllerError(error, res);
    }
  };
}
import { Request, Response } from 'express';
