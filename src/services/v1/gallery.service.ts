import { inject, injectable } from 'tsyringe';
import { MessageService } from '../../utils/MessageService';
import { GalleryDocument, GalleryModel } from '../../entities/gallery.schema';

@injectable()
export class GalleryService {
  constructor(
    @inject(MessageService) private readonly messageService: MessageService,
  ) { }

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
}
