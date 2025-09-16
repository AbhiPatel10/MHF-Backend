import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { sendResponse } from "../../utils/response";
import { UserRequest } from "../../types/types";
import { MessageService } from "../../utils/MessageService";
import cloudinary from "../../config/cloudinary.config";
import { ImageService } from "../../services/admin/image.service";

@injectable()
export class ImageController {
    constructor(
        @inject(ImageService) private readonly imageService: ImageService,
        @inject(MessageService) private readonly messageService: MessageService,

    ) { }

    // Image upload controller
    uploadImageController = async (req: UserRequest & { file?: Express.Multer.File }, res: Response, next: NextFunction) => {
        try {

            const file = req.file;
            if (!file) {
                return sendResponse({
                    res,
                    status: 400,
                    message: 'No image file uploaded',
                    data: null
                });
            }

            const result: Promise<UploadApiResponse> = new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { resource_type: 'image' },
                    (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
                        if (error) return reject(error);
                        if (result) return resolve(result);
                        reject(new Error('Unknown error during image upload'));
                    }
                ).end(req.file?.buffer);
            });

            try {
                const uploadResult = await result;

                const { data } = await this.imageService.imageUploadService({
                    url: uploadResult.secure_url,
                    imageType: uploadResult.format,
                    publicId: uploadResult.public_id,
                });

                return sendResponse({
                    res,
                    status: 200,
                    message: this.messageService.IMAGE_UPLOAD_SUCCESS,
                    data: {
                        publicId: uploadResult.public_id,
                        url: uploadResult.secure_url,
                        adminImageId: data?.adminImageId ?? 0
                    }
                })
            } catch (error) {
                throw error;
            }
        } catch (error) {
            console.error('----- uploadImageController Error:', error);
            return sendResponse({
                res,
                status: 500,
                message: this.messageService.IMAGE_UPLOAD_ERROR,
                data: null
            });
        }
    };

    deleteImageController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { adminImageId } = req.params;

            const result = await this.imageService.imageDeleteService({ adminImageId: Number(adminImageId ?? 0) });

            return sendResponse({
                res,
                status: result.success ? 200 : 400,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            console.error("----- deleteImageController Error:", error);
            return sendResponse({
                res,
                status: 500,
                message: this.messageService.IMAGE_DELETE_ERROR,
                data: null
            });
        }
    };
}