import { inject, injectable } from "tsyringe";

import { AppDataSource } from "../../config/database";
import { MessageService } from "../../utils/MessageService";
import cloudinary from '../../config/cloudinary.config';
import { AdminImages } from "../../entities/admin/adminImages.entity";


@injectable()
export class ImageService {
    private readonly imageRepository = AppDataSource.getRepository(AdminImages);

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    async imageUploadService({ url, imageType, publicId }: { url: string, imageType: string, publicId: string }): Promise<{ success: boolean, message: string, data: AdminImages | null }> {
        try {

            const imageData = this.imageRepository.create({
                url: url,
                altText: "Image",
                mimeType: imageType,
                publicId: publicId,
            })
            const imageResponse = await this.imageRepository.save(imageData);

            return {
                success: true,
                data: imageResponse,
                message: this.messageService.IMAGE_ADDED_SUCCESS
            }
        } catch (error) {
            console.error('----- imageUploadService Error:', error);
            return {
                success: false,
                message: this.messageService.IMAGE_ADDED_ERROR,
                data: null
            }
        }
    }


    async imageDeleteService({ adminImageId }: { adminImageId: number }): Promise<{ success: boolean; message: string; data: any | null }> {
        try {
            // 1️⃣ Find image by adminImageId
            const image = await this.imageRepository.findOne({
                where: { adminImageId },
            });

            if (!image) {
                return {
                    success: false,
                    message: this.messageService.IMAGE_NOT_FOUND,
                    data: null
                };
            };

            // 2️⃣ Delete from Cloudinary
            await cloudinary.uploader.destroy(image.publicId ?? "");

            // 3️⃣ Delete from Database
            await this.imageRepository.remove(image);

            return {
                success: true,
                message: this.messageService.IMAGE_DELETE_SUCCESS,
                data: null
            };
        } catch (error) {
            console.error("----- imageDeleteService Error:", error);
            return {
                success: false,
                message: this.messageService.IMAGE_DELETE_ERROR,
                data: null
            };
        }
    }
}
