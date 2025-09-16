// import { In } from "typeorm";
// import { inject, injectable } from "tsyringe";

// import { Products } from "../../entities/product.entity";
// import { AppDataSource } from "../../config/database";
// import { MessageService } from "../../utils/MessageService";
// import { Image } from "../../entities/image.entity";
// import { User } from "../../entities/user.entity";
// import { ImageService } from "./image.service";

// @injectable()
// export class ProductsService {
//     private productRepo = AppDataSource.getRepository(Products);
//     private readonly imageRepository = AppDataSource.getRepository(Image);

//     constructor(
//         @inject(MessageService) private readonly messageService: MessageService,
//         @inject(ImageService) private readonly imageService: ImageService,
//     ) { }

//     async getExistingProductByNameAndBusiness({ productName, businessId, userId }: { productName: string, businessId: number, userId: number }): Promise<Products | null> {
//         try {
//             const query = this.productRepo.createQueryBuilder('products')
//                 .leftJoinAndSelect("products.createdBy", "createdBy")
//                 .leftJoinAndSelect("products.business", "business")
//                 .leftJoinAndSelect("products.images", "images")
//                 .where("products.productName = :productName", { productName: productName })

//             if (userId) {
//                 query.andWhere('createdBy.userId = :userId', { userId })
//             }
//             if (businessId) {
//                 query.andWhere('business.businessId = :businessId', { businessId })
//             }

//             query.andWhere('products.isActive = :isActive', { isActive: true })
//                 .andWhere('products.isDelete = :isDelete', { isDelete: false })
//                 .andWhere("business.businessId = :businessId", { businessId })
//                 .select([
//                     "products.productId",
//                     "products.productName",
//                     "products.description",
//                     "products.price",
//                     "products.gstPercentage",
//                     "products.rateInclusive",
//                     "images.imageId",
//                     "images.url",
//                 ])

//             const existProduct = await query.getOne();

//             return existProduct;
//         } catch (error) {
//             console.error('----- getExistingProductByNameAndBusiness Error:', error);
//             return null;
//         }
//     }

//     async createProductsService({ userId, businessId, productName, description, price, images, gstPercentage, rateInclusive }:
//         { userId: number, businessId: number, productName: string, description: string, price: number, images: number[], gstPercentage?: number, rateInclusive?: boolean }): Promise<{ success: boolean, message: string, data: Products | null }> {
//         try {

//             let existProduct = await this.getExistingProductByNameAndBusiness({ productName, userId, businessId: businessId });

//             if (existProduct) {
//                 return {
//                     success: false,
//                     message: this.messageService.PRODUCT_ALREADY_EXIST,
//                     data: existProduct
//                 }
//             }
//             const imageEntities = images.length
//                 ? await this.imageRepository.find({
//                     where: { imageId: In(images) },
//                 })
//                 : [];

//             if (images.length && imageEntities.length !== images.length) {
//                 return {
//                     success: false,
//                     message: this.messageService.IMAGE_NOT_FOUND,
//                     data: null
//                 }
//             }

//             const product = this.productRepo.create({
//                 productName,
//                 description,
//                 price,
//                 createdBy: { userId },
//                 images: imageEntities,
//                 rateInclusive: rateInclusive ?? false,
//                 gstPercentage: gstPercentage ?? 0,
//                 business: { businessId }
//             });
//             const savedProduct = await this.productRepo.save(product);

//             const { data } = await this.getProductDetailsService({ userId, productId: savedProduct.productId ?? 0 });

//             return {
//                 success: true,
//                 data: data,
//                 message: this.messageService.PRODUCT_CREATE_SUCCESS
//             };
//         } catch (error) {
//             console.error("----- createProductsService Error:", error);
//             return {
//                 success: false,
//                 data: null,
//                 message: this.messageService.PRODUCT_CREATE_ERROR
//             };
//         }
//     }

//     async getAllProductsService({ userId }: { userId: number }) {
//         try {
//             const query = this.productRepo.createQueryBuilder('products')
//                 .leftJoinAndSelect('products.createdBy', 'createdBy')
//                 .leftJoinAndSelect('products.business', 'business')
//                 .leftJoinAndSelect('products.images', 'images')
//                 .where('products.isActive = :isActive', { isActive: true })
//                 .andWhere('products.isDelete = :isDelete', { isDelete: false })

//             if (userId) {
//                 query.andWhere('createdBy.userId = :userId', { userId })
//             }

//             let existProduct = await query.select([
//                 "products.productId",
//                 "products.productName",
//                 "products.description",
//                 "products.price",
//                 "products.gstPercentage",
//                 "products.rateInclusive",
//                 "images.imageId",
//                 "images.url",
//             ]).getMany();

//             return { success: true, data: existProduct, message: this.messageService.GET_ALL_PRODUCT_FETCH_SUCCESS };
//         } catch (error) {
//             console.error("----- getAllProducts Error:", error);
//             return { success: false, data: null, message: this.messageService.GET_ALL_PRODUCT_FETCH_ERROR };
//         }
//     }

//     async getProductDetailsService({ userId, productId }: { userId: number, productId: number }) {
//         try {

//             const query = this.productRepo.createQueryBuilder('products')
//                 .leftJoinAndSelect('products.createdBy', 'createdBy')
//                 .leftJoinAndSelect('products.business', 'business')
//                 .leftJoinAndSelect('products.images', 'images')
//                 .where("products.productId = :productId", { productId: productId })
//                 .andWhere('products.isActive = :isActive', { isActive: true })
//                 .andWhere('products.isDelete = :isDelete', { isDelete: false })

//             if (userId) {
//                 query.andWhere('createdBy.userId = :userId', { userId })
//             }

//             let existProduct = await query.select([
//                 "products.productId",
//                 "products.productName",
//                 "products.description",
//                 "products.price",
//                 "products.gstPercentage",
//                 "products.rateInclusive",
//                 "images.imageId",
//                 "images.url",
//             ]).getOne();

//             if (!existProduct) return { success: false, data: null, message: this.messageService.PRODUCT_NOT_FOUND };

//             return { success: true, data: existProduct, message: this.messageService.PRODUCT_FETCH_SUCCESS };
//         } catch (error) {
//             console.error("----- getProductDetailsService Error:", error);
//             return { success: false, data: null, message: this.messageService.PRODUCT_FETCH_ERROR };
//         }
//     }
//     async updateProductsService({
//         productId, userId, productName, description, price, images, gstPercentage, rateInclusive
//     }: {
//         productId: number, userId: number, productName: string, description: string, price: number, images: number[], gstPercentage?: number, rateInclusive?: boolean
//     }) {
//         try {
//             const product = await this.productRepo.findOne({
//                 where: { productId, isDelete: false },
//                 relations: ['images', 'createdBy', 'business', 'modifiedBy']
//             });

//             if (!product) {
//                 return {
//                     success: false,
//                     data: null,
//                     message: this.messageService.PRODUCT_NOT_FOUND
//                 };
//             };

//             if (productName) {
//                 const duplicate = await this.productRepo.findOne({
//                     where: { productName, createdBy: { userId } }
//                 });
//                 if (duplicate && duplicate.productId !== productId) {
//                     return {
//                         success: false,
//                         message: this.messageService.PRODUCT_ALREADY_EXIST,
//                         data: duplicate
//                     }
//                 }
//             }

//             product.productName = productName ?? product.productName;
//             product.description = description ?? product.description;
//             product.price = price ?? product.price;
//             product.modifiedBy = { userId } as User;
//             product.gstPercentage = gstPercentage ?? product.gstPercentage ?? 0;
//             product.rateInclusive = rateInclusive ?? product.rateInclusive ?? false;

//             // ✅ handle images
//             if (images !== undefined) {
//                 const currentImageIds = product.images?.map(img => img.imageId);

//                 if (images.length > 0) {
//                     // new image list
//                     const newImages = await this.imageRepository.find({
//                         where: { imageId: In(images) },
//                     });

//                     product.images = newImages;

//                     // delete the removed ones
//                     const removedImageIds = currentImageIds?.filter(id => !images.includes(id)) || [];
//                     for (const imgId of removedImageIds) {
//                         await this.imageService.imageDeleteService({ imageId: imgId });
//                     }
//                 } else {
//                     // remove all images
//                     for (const img of product.images || []) {
//                         await this.imageService.imageDeleteService({ imageId: img.imageId });
//                     }
//                     product.images = [];
//                 }
//             }

//             const updatedProduct = await this.productRepo.save(product);
//             const { data } = await this.getProductDetailsService({ userId, productId: updatedProduct.productId ?? 0 });

//             return { success: true, data: data, message: this.messageService.PRODUCT_UPDATE_SUCCESS };
//         } catch (error) {
//             console.error("----- updateProductsService Error:", error);
//             return { success: false, data: null, message: this.messageService.PRODUCT_UPDATE_ERROR };
//         }
//     }

//     async deleteProductsService({
//         productId,
//         userId,
//     }: {
//         productId: number;
//         userId: number;
//     }): Promise<{ success: boolean; message: string; data: null }> {
//         try {
//             const product = await this.productRepo.findOne({
//                 where: { productId, isActive: true, isDelete: false },
//                 relations: ["images", "createdBy"],
//             });

//             if (!product) {
//                 return {
//                     success: false,
//                     message: this.messageService.PRODUCT_NOT_FOUND,
//                     data: null,
//                 };
//             }

//             // only allow owner to delete
//             if (product.createdBy?.userId !== userId) {
//                 return {
//                     success: false,
//                     message: this.messageService.PRODUCT_DELETE_NOT_ALLOWED,
//                     data: null,
//                 };
//             }

//             // delete associated images
//             if (product.images?.length) {
//                 for (const img of product.images) {
//                     await this.imageService.imageDeleteService({ imageId: img.imageId });
//                 }
//                 product.images = [];
//             }

//             // soft delete
//             product.isDelete = true;
//             product.modifiedBy = { userId } as User;

//             await this.productRepo.save(product);

//             return {
//                 success: true,
//                 message: this.messageService.PRODUCT_DELETE_SUCCESS,
//                 data: null,
//             };
//         } catch (error) {
//             console.error("----- deleteProductsService Error:", error);
//             return {
//                 success: false,
//                 message: this.messageService.PRODUCT_DELETE_ERROR,
//                 data: null,
//             };
//         }
//     }

// }
