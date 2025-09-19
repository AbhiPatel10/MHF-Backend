import mongoose from 'mongoose';
import { GalleryModel } from '../../entities/admin/gallery.schema';
import { MessageService } from '../../utils/MessageService';
import { inject, injectable } from 'tsyringe';
import { ImageDocument } from 'src/entities/admin/adminImages.entity';
import { ImageService } from './image.service';

@injectable()
export class GalleryService {
  constructor(
    @inject(MessageService) private readonly messageService: MessageService,
    @inject(ImageService) private readonly imageService: ImageService
  ) {}

  /**
   * Creates volunteer service
   * @param { image }
   * @returns volunteer service
   */

  async AddImageToGalleryService({
    image,
    altText,
    imageDescription,
  }: {
    image: mongoose.Schema.Types.ObjectId;
    altText: string;
    imageDescription: string;
  }): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const gallery = new GalleryModel({
        image,
        altText,
        imageDescription,
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
        data: galleryImage.image,
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

  async UpdateImageToGalleryService({
    id,
    image,
    altText,
    imageDescription,
  }: {
    id: string;
    image: mongoose.Types.ObjectId | ImageDocument;
    altText: string;
    imageDescription: string;
  }): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      const galleryImage = await GalleryModel.findById(id);

      if (!galleryImage) {
        return {
          success: false,
          message: this.messageService.IMAGE_NOT_FOUND,
          data: null,
        };
      }

      if (galleryImage.image !== image) {
        const prevImage = galleryImage.image._id;
        await this.imageService.imageDeleteService({
          imageId: prevImage as string,
        });
      }

      console.log(galleryImage.image, 'galleryImage.image');

      galleryImage.image = image;
      galleryImage.altText = altText;
      galleryImage.imageDescription = imageDescription;

      await galleryImage.save();

      return {
        success: true,
        message: this.messageService.UPDATE_IMAGE_TO_GALLERY_SUCCESSFULLY,
        data: galleryImage,
      };
    } catch (error) {
      console.error('Error in UpdateImageToGalleryService:', error);
      return {
        success: false,
        message: this.messageService.UPDATE_IMAGE_TO_GALLERY_ERROR,
        data: null,
      };
    }
  }
}
