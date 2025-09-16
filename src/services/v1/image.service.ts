// import { inject, injectable } from "tsyringe";

// import { AppDataSource } from "../../config/database";
// import { MessageService } from "../../utils/MessageService";
// import { Image } from '../../entities/image.entity';
// import cloudinary from '../../config/cloudinary.config';


// @injectable()
// export class ImageService {

//     private readonly saltRounds = 10;
//     private readonly jwtSecret = process.env.JWT_SECRET ?? "";
//     private readonly imageRepository = AppDataSource.getRepository(Image);

//     constructor(
//         @inject(MessageService) private readonly messageService: MessageService,
//     ) { }

//     async imageUploadService({ url, imageType, userId, publicId }: { url: string, imageType: string, userId: number, publicId: string }): Promise<{ success: boolean, message: string, data: Image | null }> {
//         try {

//             const imageData = this.imageRepository.create({
//                 url: url,
//                 altText: "Image",
//                 mimeType: imageType,
//                 publicId: publicId,
//                 user: { userId }
//             })
//             const imageResponse = await this.imageRepository.save(imageData);

//             return {
//                 success: true,
//                 data: imageResponse,
//                 message: this.messageService.IMAGE_ADDED_SUCCESS
//             }
//         } catch (error) {
//             console.error('----- imageUploadService Error:', error);
//             return {
//                 success: false,
//                 message: this.messageService.IMAGE_ADDED_ERROR,
//                 data: null
//             }
//         }
//     }


//     async imageDeleteService({ imageId }: { imageId: number }): Promise<{ success: boolean; message: string; data: any | null }> {
//         try {
//             // 1️⃣ Find image by imageId
//             const image = await this.imageRepository.findOne({
//                 where: { imageId },
//             });

//             if (!image) {
//                 return {
//                     success: false,
//                     message: this.messageService.IMAGE_NOT_FOUND,
//                     data: null
//                 };
//             }

//             // 2️⃣ Delete from Cloudinary
//             await cloudinary.uploader.destroy(image.publicId ?? "");

//             // 3️⃣ Delete from Database
//             await this.imageRepository.remove(image);

//             return {
//                 success: true,
//                 message: this.messageService.IMAGE_DELETE_SUCCESS,
//                 data: null
//             };
//         } catch (error) {
//             console.error("----- imageDeleteService Error:", error);
//             return {
//                 success: false,
//                 message: this.messageService.IMAGE_DELETE_ERROR,
//                 data: null
//             };
//         }
//     }
// }
