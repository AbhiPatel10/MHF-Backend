import { inject, injectable } from "tsyringe";

import { AppDataSource } from "../../config/database";
import { MessageService } from "../../utils/MessageService";
import { User } from "../../entities/user.entity";
import { Image } from '../../entities/image.entity';
import { ImageService } from './image.service';


@injectable()
export class UserService {
    private readonly userRepository = AppDataSource.getRepository(User);
    private readonly imageRepository = AppDataSource.getRepository(Image);

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
        @inject(ImageService) private readonly imageService: ImageService,
    ) { }

    async getUserDetailsService({ userId }: { userId: number }): Promise<{ success: boolean, message: string, data: User | null }> {
        try {
            const user = await this.userRepository
                .createQueryBuilder("user")
                .leftJoinAndSelect("user.image", "image")
                .where("user.userId = :userId", { userId })
                .andWhere("user.isActive = :isActive", { isActive: true })
                .andWhere("user.isDelete = :isDelete", { isDelete: false })
                .select([
                    "user.userId",
                    "user.name",
                    "user.phoneNo",
                    "user.isVerified",
                    "image.url",
                ])
                .getOne();

            if (!user) {
                return {
                    success: false,
                    message: this.messageService.USER_NOT_FOUND,
                    data: null
                };
            }

            return {
                success: true,
                message: this.messageService.USER_FETCH_SUCCESS,
                data: user
            };
        } catch (error) {
            console.error('----- getUserDetailsService Error:', error);
            return {
                success: false,
                message: this.messageService.USER_CREATE_ERROR,
                data: null
            }
        }
    }

    async updateUserService({ name, imageId, userId }: { name?: string; imageId?: number, userId?: number }): Promise<{ success: boolean; message: string; data: User | null }> {
        try {
            const user = await this.userRepository.findOne({ where: { userId, isDelete: false, isActive: true } });

            if (!user) {
                return {
                    success: false,
                    message: this.messageService.USER_NOT_EXIST,
                    data: null
                };
            }

            // Handle image update properly
            if (imageId !== undefined) {
                if (imageId === null) {
                    // Remove existing image
                    if (user.image) {
                        await this.imageService.imageDeleteService({
                            imageId: user.image.imageId
                        });
                        user.image = null;
                    }
                } else {
                    // Replace with new image
                    const newImage = await this.imageRepository.findOne({
                        where: { imageId }
                    });

                    if (newImage) {
                        // Delete old one if different
                        if (user.image && user.image.imageId !== newImage.imageId) {
                            await this.imageService.imageDeleteService({
                                imageId: user.image.imageId
                            });
                        }
                        user.image = newImage;
                    }
                }
            }
            if (name) {
                user.name = name;
            }

            const updatedUser = await this.userRepository.save(user);

            const responseData = await this.getUserDetailsService({ userId: updatedUser.userId ?? 0 });

            return {
                success: true,
                message: this.messageService.USER_UPDATE_SUCCESS,
                data: responseData.data
            };
        } catch (error) {
            console.error("----- updateUserService Error:", error);
            return {
                success: false,
                message: this.messageService.USER_UPDATE_ERROR,
                data: null
            };
        }
    }
}
