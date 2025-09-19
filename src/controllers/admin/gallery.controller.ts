import { GalleryService } from '../../services/admin/gallery.service';
import { handleControllerError } from '../../utils/errorHandler';
import { sendResponse } from '../../utils/response';
import { inject, injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { ImageService } from '../../services/admin/image.service';

@injectable()
export class GalleryController {
  constructor(
    @inject(GalleryService) private readonly galleryService: GalleryService,
    @inject(ImageService) private readonly imageService: ImageService
  ) { }

  //   add image to gallery
  addImageToGalleryController = async (req: Request, res: Response) => {
    try {
      const { image, altText, imageDescription } = req.body;
      const { success, message, data } =
        await this.galleryService.AddImageToGalleryService({
          image,
          altText,
          imageDescription,
        });
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

  // Update Gallery Description
  updateGalleryController = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { image, altText, imageDescription } = req.body;
      const { success, message, data } =
        await this.galleryService.UpdateImageToGalleryService({
          id,
          image,
          altText,
          imageDescription,
        });
      return sendResponse({
        res,
        status: success ? 200 : 400,
        message,
        data,
      });
    } catch (error) {
      console.error('Error in Update GalleryController:', error);
    }
  };

  // Remove Image from Gallery
  removeImageToGalleryController = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { success, message, data } =
        await this.galleryService.RemoveImageToGalleryService({ id });

      if (success) {
        await this.imageService.imageDeleteService({ imageId: data });
      }
      return sendResponse({
        res,
        status: success ? 200 : 400,
        message,
        data: [],
      });
    } catch (error) {
      console.error('Error in Remove Image To GalleryController:', error);
      handleControllerError(error, res);
    }
  };
}
