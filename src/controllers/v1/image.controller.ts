import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { sendResponse } from "../../utils/response";
import { ImageService } from "../../services/v1/image.service";
import { UserRequest } from "../../types/types";
import { MessageService } from "../../utils/MessageService";
import cloudinary from "../../config/cloudinary.config";
import { handleControllerError } from "../../utils/errorHandler";

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
                    userId: req.user?.userId ?? 0,
                    publicId: uploadResult.public_id,
                });

                return sendResponse({
                    res,
                    status: 200,
                    message: this.messageService.IMAGE_UPLOAD_SUCCESS,
                    data: {
                        publicId: uploadResult.public_id,
                        url: uploadResult.secure_url,
                        imageId: data?.imageId ?? 0
                    }
                })
            } catch (error) {
                throw error;
            }
        } catch (error) {
            console.error('----- uploadImageController Error:', error);
            handleControllerError(error, res);
        }
    };

    deleteImageController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { imageId } = req.params;

            const result = await this.imageService.imageDeleteService({ imageId: Number(imageId ?? 0) });

            return sendResponse({
                res,
                status: result.success ? 200 : 400,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            console.error("----- deleteImageController Error:", error);
            handleControllerError(error, res);
        }
    };
}