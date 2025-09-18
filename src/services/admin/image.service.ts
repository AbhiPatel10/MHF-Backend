import { injectable, inject } from "tsyringe";
import cloudinary from "../../config/cloudinary.config";
import { MessageService } from "../../utils/MessageService";
import { ImageDocument, ImageModel } from "../../entities/admin/adminImages.entity";

@injectable()
export class ImageService {
    constructor(
        @inject(MessageService) private readonly messageService: MessageService
    ) { }

    /**
     * Upload Image and Save to DB
     */
    async imageUploadService({ url, imageType, publicId }: { url: string; imageType: string; publicId: string; }): Promise<{ success: boolean; message: string; data: ImageDocument | null }> {
        try {
            const imageData = new ImageModel({
                url,
                altText: "Image",
                mimeType: imageType,
                publicId,
            });

            const imageResponse = await imageData.save();

            return {
                success: true,
                data: imageResponse,
                message: this.messageService.IMAGE_ADDED_SUCCESS,
            };
        } catch (error) {
            console.error("----- imageUploadService Error:", error);
            return {
                success: false,
                message: this.messageService.IMAGE_ADDED_ERROR,
                data: null,
            };
        }
    }

    /**
     * Delete Image by ID
     */
    async imageDeleteService({ imageId }: { imageId: string }): Promise<{ success: boolean; message: string; data: any | null }> {
        try {
            // 1️⃣ Find image by ID
            const image = await ImageModel.findById(imageId);

            if (!image) {
                return {
                    success: false,
                    message: this.messageService.IMAGE_NOT_FOUND,
                    data: null,
                };
            }

            // 2️⃣ Delete from Cloudinary
            if (image.publicId) {
                await cloudinary.uploader.destroy(image.publicId);
            }

            // 3️⃣ Delete from DB
            await image.deleteOne();

            return {
                success: true,
                message: this.messageService.IMAGE_DELETE_SUCCESS,
                data: null,
            };
        } catch (error) {
            console.error("----- imageDeleteService Error:", error);
            return {
                success: false,
                message: this.messageService.IMAGE_DELETE_ERROR,
                data: null,
            };
        }
    }
}
