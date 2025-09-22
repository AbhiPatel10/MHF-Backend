import mongoose from 'mongoose';
import { MessageService } from '../../utils/MessageService';
import { inject, injectable } from 'tsyringe';
import { ImageDocument } from 'src/entities/admin/adminImages.entity';
import { ImageService } from './image.service';
import { GalleryDocument, GalleryModel } from '../../entities/gallery.schema';

@injectable()
export class GalleryService {
  constructor(
    @inject(MessageService) private readonly messageService: MessageService,
    @inject(ImageService) private readonly imageService: ImageService
  ) { }

  /**
   * Creates volunteer service
   * @param { image }
   * @returns volunteer service
   */
  async AddImageToGalleryService({ image, altText, imageDescription }: { image: mongoose.Schema.Types.ObjectId; altText: string; imageDescription: string; }): Promise<{ success: boolean; message: string; data?: null }> {
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

  /**
   * Gets all image to gallery service
   * @param { limit, offset } 
   * @returns all image to gallery service 
   */
  async GetAllImageToGalleryService({ limit, offset }: { limit: string; offset: string }): Promise<{ success: boolean; message: string; data?: { galleryImages: GalleryDocument[], totalCount: number } | null }> {
    try {
      const galleryImages = await GalleryModel.find()
        .populate("image", "url")
        .limit(+limit)
        .skip(+offset)

      const totalCount = await GalleryModel.countDocuments();

      return {
        success: true,
        message: this.messageService.GET_ALL_GALLERY_IMAGES_SUCCESS,
        data: {
          galleryImages,
          totalCount
        },
      };
    } catch (error) {
      console.error('Error in GetAllImageToGalleryService:', error);
      return {
        success: false,
        message: this.messageService.GET_ALL_GALLERY_IMAGES_ERROR,
        data: null,
      };
    }
  }

  /**
   * Removes image to gallery service
   * @param { id } 
   * @returns image to gallery service 
   */
  async RemoveImageToGalleryService({ id }: { id: string }): Promise<{ success: boolean; message: string; data?: any }> {
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

  /**
   * Updates image to gallery service
   * @param { id, image, altText, imageDescription } 
   * @returns image to gallery service 
   */
  async UpdateImageToGalleryService({ id, image, altText, imageDescription }: { id: string; image: mongoose.Types.ObjectId | ImageDocument; altText: string; imageDescription: string; }): Promise<{ success: boolean; message: string; data?: any }> {
    try {
      console.log("id----", id)
      const galleryImage = await GalleryModel.findById(id).populate("image");

      if (!galleryImage) {
        return {
          success: false,
          message: this.messageService.IMAGE_NOT_FOUND,
          data: null,
        };
      }

      if (image) {
        if (galleryImage.image !== image) {
          const prevImage = galleryImage.image._id;
          await this.imageService.imageDeleteService({
            imageId: prevImage as string,
          });
        }
      }
      console.log("galleryImage---", galleryImage)
      console.log("image---", image)
      if (image) {
        console.log("sdsdsds")
        galleryImage.image = image;
      } else {
        galleryImage.image = galleryImage.image;
      }
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
