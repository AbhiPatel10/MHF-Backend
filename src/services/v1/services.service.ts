import { inject, injectable } from "tsyringe";

import { AppDataSource } from "../../config/database";
import { MessageService } from "../../utils/MessageService";
import { User } from "../../entities/user.entity";
import { Services } from '../../entities/service.entity';
import { Image } from "../../entities/image.entity";
import { In } from "typeorm";
import { ImageService } from "./image.service";

@injectable()
export class ServicesService {
    private readonly serviceRepository = AppDataSource.getRepository(Services);
    private readonly imageRepository = AppDataSource.getRepository(Image);

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
        @inject(ImageService) private readonly imageService: ImageService,
    ) { }

    async getExistingServiceByNameAndBusiness({ serviceName, businessId, userId }: { serviceName: string, businessId: number, userId: number }): Promise<Services | null> {
        try {
            const query = this.serviceRepository
                .createQueryBuilder("service")
                .leftJoinAndSelect("service.createdBy", "createdBy")
                .leftJoinAndSelect("service.business", "business")
                .leftJoinAndSelect("service.images", "images")
                .where("service.serviceName = :serviceName", { serviceName })

            if (userId) {
                query.andWhere('createdBy.userId = :userId', { userId })
            }

            if (businessId) {
                query.andWhere('business.businessId = :businessId', { businessId })
            }

            query.andWhere("business.businessId = :businessId", { businessId })
                .andWhere('service.isActive = :isActive', { isActive: true })
                .andWhere('service.isDelete = :isDelete', { isDelete: false })
                .select([
                    "service.serviceId",
                    "service.serviceName",
                    "service.description",
                    "service.price",
                    "service.gstPercentage",
                    "service.rateInclusive",
                    "images.imageId",
                    "images.url",
                ])

            const existService = await query.getOne();

            return existService;
        } catch (error) {
            console.error('----- getExistingServiceByNameAndBusiness Error:', error);
            return null;
        }
    }

    async createServices({
        userId, businessId, serviceName, description, price, images, gstPercentage, rateInclusive
    }: {
        userId: number, businessId: number, serviceName: string, description: string, price: number, images: number[], gstPercentage?: number, rateInclusive?: boolean
    }): Promise<{ success: boolean, message: string, data: Services | null }> {
        try {

            let existService = await this.getExistingServiceByNameAndBusiness({ serviceName, businessId, userId });

            if (existService) {
                return {
                    success: false,
                    message: this.messageService.SERVICE_ALREADY_EXIST,
                    data: existService
                }
            }

            const imageEntities = images.length
                ? await this.imageRepository.find({
                    where: { imageId: In(images) },
                })
                : [];

            const createService = this.serviceRepository.create({
                serviceName,
                description,
                price,
                business: { businessId },
                createdBy: { userId } as User,
                images: imageEntities,
                rateInclusive: rateInclusive ?? false,
                gstPercentage: gstPercentage ?? 0
            });
            existService = await this.serviceRepository.save(createService);

            const { data } = await this.getServicesDetails({ userId, businessId, serviceId: existService?.serviceId ?? 0 });

            return {
                success: true,
                data: data,
                message: this.messageService.SERVICE_CREATE_SUCCESS
            }
        } catch (error) {
            console.error('----- createServices Error:', error);
            return {
                success: false,
                message: this.messageService.SERVICE_CREATE_ERROR,
                data: null
            }
        }
    }

    async updateServices({
        serviceId, userId, businessId, serviceName, description, price, images, gstPercentage, rateInclusive
    }: {
        serviceId: number, userId: number, businessId: number, serviceName?: string, description?: string, price?: number, images?: number[], gstPercentage?: number, rateInclusive?: boolean
    }): Promise<{ success: boolean, message: string, data: Services | null }> {

        try {
            let existingService = await this.serviceRepository.findOne({
                where: { serviceId, ...(businessId && { business: { businessId } }), },
                relations: ["createdBy", "business", "images"]
            });

            if (!existingService) {
                return {
                    success: false,
                    message: this.messageService.SERVICE_NOT_FOUND,
                    data: null
                }
            }

            // Check if serviceName already exists for same business (if serviceName provided)
            if (serviceName) {
                const duplicate = await this.serviceRepository.findOne({
                    where: { serviceName, createdBy: { userId } }
                });
                if (duplicate && duplicate.serviceId !== serviceId) {
                    return {
                        success: false,
                        message: this.messageService.SERVICE_ALREADY_EXIST,
                        data: duplicate
                    }
                }
            }

            // Update fields
            if (serviceName !== undefined) existingService.serviceName = serviceName;
            if (description !== undefined) existingService.description = description;
            if (price !== undefined) existingService.price = price;
            if (gstPercentage !== undefined) existingService.gstPercentage = gstPercentage;
            if (rateInclusive !== undefined) existingService.rateInclusive = rateInclusive;

            existingService.modifiedBy = { userId } as User;


            // ✅ handle images
            if (images !== undefined) {
                const currentImageIds = existingService.images?.map(img => img.imageId);

                if (images.length > 0) {
                    // new image list
                    const newImages = await this.imageRepository.find({
                        where: { imageId: In(images) },
                    });

                    existingService.images = newImages;

                    // delete the removed ones
                    const removedImageIds = currentImageIds?.filter(id => !images.includes(id)) || [];
                    for (const imgId of removedImageIds) {
                        await this.imageService.imageDeleteService({ imageId: imgId });
                    }
                } else {
                    // remove all images
                    for (const img of existingService.images || []) {
                        await this.imageService.imageDeleteService({ imageId: img.imageId });
                    }
                    existingService.images = [];
                }
            }
            await this.serviceRepository.save(existingService);

            const { data } = await this.getServicesDetails({ userId, businessId, serviceId: serviceId });

            return {
                success: true,
                data: data,
                message: this.messageService.SERVICE_UPDATE_SUCCESS
            }
        } catch (error) {
            console.error('----- updateServices Error:', error);
            return {
                success: false,
                message: this.messageService.SERVICE_UPDATE_ERROR,
                data: null
            }
        }
    }

    async getAllServices({ userId, businessId }: { userId: number, businessId: number }): Promise<{ success: boolean, message: string, data: Services[] | null }> {
        try {
            const query = this.serviceRepository.createQueryBuilder('services')
                .leftJoinAndSelect('services.createdBy', 'createdBy')
                .leftJoinAndSelect('services.business', 'business')
                .leftJoinAndSelect("services.images", "images")
                .where('services.isActive = :isActive', { isActive: true })
                .andWhere('services.isDelete = :isDelete', { isDelete: false })

            if (businessId) {
                query.andWhere('business.businessId = :businessId', { businessId })
            }

            if (userId) {
                query.andWhere('createdBy.userId = :userId', { userId })
            }

            let existService = await query.select([
                "services.serviceId",
                "services.serviceName",
                "services.description",
                "services.price",
                "services.gstPercentage",
                "services.rateInclusive",
                "images.imageId",
                "images.url",
            ]).getMany();

            return {
                success: true,
                data: existService,
                message: this.messageService.GET_ALL_SERVICE_FETCH_SUCCESS
            }
        } catch (error) {
            console.error('----- getAllServices Error:', error);
            return {
                success: false,
                message: this.messageService.GET_ALL_SERVICE_FETCH_ERROR,
                data: null
            }
        }
    }

    async getServicesDetails({ userId, businessId, serviceId }: { userId: Number, businessId: Number, serviceId: Number }): Promise<{ success: boolean, message: string, data: Services | null }> {
        try {
            const query = this.serviceRepository.createQueryBuilder('services')
                .leftJoinAndSelect('services.createdBy', 'createdBy')
                .leftJoinAndSelect('services.images', 'images')
                .leftJoinAndSelect('services.business', 'business')
                .where("services.serviceId = :serviceId", { serviceId: serviceId })
                .andWhere('services.isActive = :isActive', { isActive: true })
                .andWhere('services.isDelete = :isDelete', { isDelete: false })

            if (businessId) {
                query.andWhere('business.businessId = :businessId', { businessId })
            }

            if (userId) {
                query.andWhere('createdBy.userId = :userId', { userId })
            }

            let existService = await query.select([
                "services.serviceId",
                "services.serviceName",
                "services.description",
                "services.price",
                "services.gstPercentage",
                "services.rateInclusive",
                "images.imageId",
                "images.url"
            ]).getOne();

            return {
                success: true,
                data: existService,
                message: this.messageService.SERVICE_FETCH_SUCCESS
            }
        } catch (error) {
            console.error('----- getServicesDetails Error:', error);
            return {
                success: false,
                message: this.messageService.SERVICE_FETCH_ERROR,
                data: null
            }
        }
    }

    async deleteServices({ serviceId, userId, businessId }: { serviceId: number; userId: number; businessId: number; }): Promise<{ success: boolean; message: string; data: null }> {
        try {
            const service = await this.serviceRepository.findOne({
                where: { serviceId, business: { businessId }, isDelete: false, isActive: true },
                relations: ["images", "createdBy"]
            });

            if (!service) {
                return {
                    success: false,
                    message: this.messageService.SERVICE_NOT_FOUND,
                    data: null
                };
            }

            // ✅ Only allow owner of service to delete
            if (service.createdBy?.userId !== userId) {
                return {
                    success: false,
                    message: this.messageService.SERVICE_DELETE_NOT_ALLOWED,
                    data: null
                };
            }

            // ✅ Remove images if exist
            if (service.images?.length) {
                for (const img of service.images) {
                    await this.imageService.imageDeleteService({ imageId: img.imageId });
                }
                service.images = [];
            }

            // ✅ Soft delete
            service.isDelete = true;
            service.modifiedBy = { userId } as User;

            await this.serviceRepository.save(service);

            return {
                success: true,
                message: this.messageService.SERVICE_DELETE_SUCCESS,
                data: null
            };
        } catch (error) {
            console.error("----- deleteServices Error:", error);
            return {
                success: false,
                message: this.messageService.SERVICE_DELETE_ERROR,
                data: null
            };
        }
    }
}
