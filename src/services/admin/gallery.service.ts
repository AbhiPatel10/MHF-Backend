import mongoose from 'mongoose';
import { GalleryModel } from '../../entities/admin/gallery.schema';
import { MessageService } from '../../utils/MessageService';
import { inject, injectable } from 'tsyringe';

@injectable()
export class GalleryService {
  constructor(
    @inject(MessageService) private readonly messageService: MessageService
  ) {}

  /**
   * Creates volunteer service
   * @param { image }
   * @returns volunteer service
   */

  async AddImageToGalleryService({
    image,
    altText,
  }: {
    image: mongoose.Schema.Types.ObjectId;
    altText: string;
  }): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const gallery = new GalleryModel({
        image,
        altText,
      });
      await gallery?.save();

      return {
        success: true,
        message: this.messageService.ADD_IMAGE_TO_GALLERY_SUCCESSFULLY,
        data: null,
      };
    } catch (error) {
      console.error('Error in AddImageToGalleryService:', error);
      return {
        success: false,
        message: this.messageService.ADD_IMAGE_TO_GALLERY_ERROR,
        data: null,
      };
    }
  }

  async GetAllImageToGalleryService({
    limit,
    offset,
  }: {
    limit: string;
    offset: string;
  }): Promise<{
    success: boolean;
    message: string;
    data?: any;
  }> {
    try {
      const galleryImage = await GalleryModel.find()
        .limit(+limit)
        .skip(+offset);

      if (!galleryImage) {
        return {
          success: false,
          message: this.messageService.IMAGE_NOT_FOUND,
          data: null,
        };
      }

      return {
        success: true,
        message: this.messageService.REMOVE_IMAGE_TO_GALLERY_SUCCESSFULLY,
        data: galleryImage,
      };
    } catch (error) {
      console.error('Error in RemoveImageToGalleryService:', error);
      return {
        success: false,
        message: this.messageService.REMOVE_IMAGE_TO_GALLERY_ERROR,
        data: null,
      };
    }
  }

  async RemoveImageToGalleryService({
    id,
  }: {
    id: string;
  }): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const galleryImage = await GalleryModel.findByIdAndDelete(id);
      console.log({ galleryImage });
      if (!galleryImage) {
        return {
          success: false,
          message: this.messageService.IMAGE_NOT_FOUND,
          data: null,
        };
      }

      await GalleryModel.findByIdAndDelete(id);

      return {
        success: true,
        message: this.messageService.REMOVE_IMAGE_TO_GALLERY_SUCCESSFULLY,
        data: null,
      };
    } catch (error) {
      console.error('Error in RemoveImageToGalleryService:', error);
      return {
        success: false,
        message: this.messageService.REMOVE_IMAGE_TO_GALLERY_ERROR,
        data: null,
      };
    }
  }
}
