import { GalleryService } from '../../services/admin/gallery.service';
import { handleControllerError } from '../../utils/errorHandler';
import { sendResponse } from '../../utils/response';
import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';

@injectable()
export class GalleryController {
  constructor(
    @inject(GalleryService) private readonly galleryService: GalleryService
  ) {}

  //   add image to gallery
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
      console.error('Error in Add Image To GalleryController:', error);
      handleControllerError(error, res);
    }
  };

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

  // Remove Image from Gallery
  removeImageToGalleryController = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      console.log({ id });
      const { success, message, data } =
        await this.galleryService.RemoveImageToGalleryService({ id });
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
