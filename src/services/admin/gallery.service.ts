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
}
