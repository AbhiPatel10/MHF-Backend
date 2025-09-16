// import { inject, injectable } from 'tsyringe';
// import { In } from 'typeorm';

// import { Categories } from '../../entities/admin/categories.entity';
// import { AppDataSource } from '../../config/database';
// import { Businesses } from '../../entities/businesses.entity';
// import { SubCategories } from '../../entities/admin/subCategories.entity';
// import { MessageService } from '../../utils/MessageService';
// import { BusinessHours } from '../../entities/businessHours.entity';
// import { generateJWTToken } from '../../utils/helper/helper';
// import { Image } from '../../entities/image.entity';
// import { ImageService } from './image.service';

// @injectable()
// export class BusinessService {
//     private businessRepo = AppDataSource.getRepository(Businesses);
//     private categoriesRepo = AppDataSource.getRepository(Categories);
//     private subCategoriesRepo = AppDataSource.getRepository(SubCategories);
//     private businessHoursRepo = AppDataSource.getRepository(BusinessHours);
//     private readonly imageRepository = AppDataSource.getRepository(Image);

//     constructor(
//         @inject(MessageService) private readonly messageService: MessageService,
//         @inject(ImageService) private readonly imageService: ImageService,
//     ) { }

//     async addBusinessDetailsService({ data, userId }: { data: Partial<Businesses> & { images?: number[] }, userId: number }) {
//         try {

//             let business = await this.businessRepo.findOne({ where: { createdBy: { userId } }, relations: ['categories', 'subCategories', 'createdBy'] });
//             let categoriesData: Categories[] = [];
//             let subCategoriesData: SubCategories[] = [];

//             if (data.categories) {
//                 categoriesData = await this.categoriesRepo.find({
//                     where: { categoryId: In(data.categories) },
//                 });
//             }
//             if (data.subCategories) {
//                 subCategoriesData = await this.subCategoriesRepo.find({
//                     where: { subCategoryId: In(data.subCategories) },
//                 });
//             }

//             let businessHoursData: BusinessHours[] = [];
//             if (data.businessHours && Array.isArray(data.businessHours)) {
//                 if (business && business.businessId) {
//                     // Update existing business hours
//                     for (const bh of data.businessHours) {
//                         const existingBH = await this.businessHoursRepo.findOne({ where: { business: { businessId: business.businessId }, day: bh.day } });
//                         if (existingBH) {
//                             existingBH.openTime = bh.isOpen24Hours ? undefined : bh.openTime;
//                             existingBH.closeTime = bh.isOpen24Hours ? undefined : bh.closeTime;
//                             existingBH.isClosed = bh.isClosed || false;
//                             existingBH.isOpen24Hours = bh.isOpen24Hours || false;
//                             await this.businessHoursRepo.save(existingBH);
//                             businessHoursData.push(existingBH);
//                         } else {
//                             const bhEntity = this.businessHoursRepo.create({
//                                 day: bh.day,
//                                 openTime: bh.isOpen24Hours ? undefined : bh.openTime,
//                                 closeTime: bh.isOpen24Hours ? undefined : bh.closeTime,
//                                 isClosed: bh.isClosed || false,
//                                 isOpen24Hours: bh.isOpen24Hours || false,
//                                 business: business
//                             });
//                             await this.businessHoursRepo.save(bhEntity);
//                             businessHoursData.push(bhEntity);
//                         }
//                     }
//                 } else {
//                     // Create new business hours
//                     businessHoursData = await Promise.all(
//                         data.businessHours.map(async (bh: any) => {
//                             const bhEntity = this.businessHoursRepo.create({
//                                 day: bh.day,
//                                 openTime: bh.isOpen24Hours ? undefined : bh.openTime,
//                                 closeTime: bh.isOpen24Hours ? undefined : bh.closeTime,
//                                 isClosed: bh.isClosed || false,
//                                 isOpen24Hours: bh.isOpen24Hours || false
//                             });
//                             return bhEntity;
//                         })
//                     );
//                 }
//             }

//             // ✅ Handle Images
//             let imagesData: Image[] = [];
//             if (data.images !== undefined) {
//                 // Fetch current images associated with business
//                 const currentImages = business?.images || [];
//                 const currentImageIds = currentImages.map(img => img.imageId);

//                 if (data.images.length > 0) {
//                     // Fetch new images from DB
//                     const newImages = await this.imageRepository.find({
//                         where: { imageId: In(data.images) },
//                     });

//                     imagesData = newImages;

//                     // Remove images that are no longer included
//                     const removedImageIds = currentImageIds.filter(id => !data.images?.includes(id));
//                     for (const imgId of removedImageIds) {
//                         await this.imageService.imageDeleteService({ imageId: imgId });
//                     }
//                 } else {
//                     // If data.images is empty, remove all existing images
//                     for (const img of currentImages) {
//                         await this.imageService.imageDeleteService({ imageId: img.imageId });
//                     }
//                     imagesData = [];
//                 }
//             }
//             const businessData: Businesses = {
//                 ...(data.name && { name: data.name }),
//                 ...(data.description && { description: data.description }),
//                 ...(data.address && { address: data.address }),
//                 ...(data.phoneNo && { phoneNo: data.phoneNo }),
//                 ...(data.whatsAppNo && { whatsAppNo: data.whatsAppNo }),
//                 ...(data.email && { email: data.email }),
//                 ...(data.website && { website: data.website }),
//                 ...(data.landMark && { landMark: data.landMark }),
//                 ...(data.city && { city: data.city }),
//                 ...(data.pinCode && { pinCode: data.pinCode }),
//                 ...(data.establishYear && { establishYear: data.establishYear }),
//                 ...(data.latitude && { latitude: data.latitude }),
//                 ...(data.longitude && { longitude: data.longitude }),
//                 ...(data.categories && { categories: categoriesData }),
//                 ...(data.subCategories && { subCategories: subCategoriesData }),
//                 ...(businessHoursData.length > 0 && { businessHours: businessHoursData }),
//                 ...(imagesData.length > 0 && { images: imagesData }),
//                 ...(!business?.createdBy && { createdBy: { userId } }),
//                 ...(business?.businessId && { modifiedBy: { userId } }),
//                 ...(typeof data.isDraft === 'boolean' && { isDraft: data.isDraft }),
//                 ...(typeof data.isDraft === 'boolean' && { isActive: !data.isDraft }),
//             }

//             if (business && business.businessId) {

//                 Object.assign(business, businessData, businessData);
//             } else {
//                 businessData.name = businessData.name ?? "-";
//                 business = this.businessRepo.create(businessData);
//             }
//             await this.businessRepo.save(business);

//             const { data: businessDetails } = await this.getBusinessById({ userId: Number(userId ?? 0) });
//             const token = generateJWTToken({ businessId: businessDetails?.businessId ?? 0, phoneNo: businessDetails?.phoneNo ?? "", userId })

//             return {
//                 success: true,
//                 data: { ...businessDetails, token },
//                 message: business ? this.messageService.BUSINESS_UPDATE_SUCCESS : this.messageService.BUSINESS_CREATE_SUCCESS
//             }
//         } catch (error) {
//             console.error('----- addBusinessDetailsService Error:', error);
//             return {
//                 success: false,
//                 message: this.messageService.BUSINESS_CREATE_ERROR,
//                 data: null
//             }
//         }
//     }

//     async getBusinessById({ userId, businessId }: { userId?: number, businessId?: number }) {
//         try {
//             const query = this.businessRepo.createQueryBuilder('business')
//                 .leftJoin('business.categories', 'categories')
//                 .leftJoin('business.subCategories', 'subCategories')
//                 .leftJoin('business.businessHours', 'businessHours')
//                 .leftJoin(
//                     'business.services',
//                     'services',
//                     'services.isActive = :isActive AND services.isDelete = :isDelete',
//                     { isActive: true, isDelete: false }
//                 )
//                 .leftJoin(
//                     'business.products',
//                     'products',
//                     'products.isActive = :isActive AND products.isDelete = :isDelete',
//                     { isActive: true, isDelete: false }
//                 )
//                 .leftJoin(
//                     'business.teamMembers',
//                     'teamMembers',
//                     'teamMembers.isActive = :isActive AND teamMembers.isDelete = :isDelete',
//                     { isActive: true, isDelete: false }
//                 )
//                 .leftJoin('business.images', 'businessImages')
//                 .leftJoin('services.images', 'servicesImages')
//                 .leftJoin('products.images', 'productsImages')
//                 .leftJoin('teamMembers.image', 'teamMembersImage')
//                 .leftJoin('business.createdBy', 'createdBy')
//                 .leftJoin('business.modifiedBy', 'modifiedBy')

//             if (userId) {
//                 query.where('createdBy.userId = :userId', { userId })
//             }

//             if (businessId) {
//                 query.where('business.businessId = :businessId', { businessId })
//             }

//             const businessData = await query.select([
//                 'business.businessId',
//                 'business.name',
//                 'business.description',
//                 'business.address',
//                 'business.phoneNo',
//                 'business.whatsAppNo',
//                 'business.email',
//                 'business.website',
//                 'business.landMark',
//                 'business.city',
//                 'business.pinCode',
//                 'business.establishYear',
//                 'business.latitude',
//                 'business.longitude',
//                 'business.isDraft',
//                 'business.avgRating',
//                 'business.totalReviews',
//                 'categories.categoryId',
//                 'categories.category',
//                 'subCategories.subCategoryId',
//                 'subCategories.subCategory',
//                 'businessHours.day',
//                 'businessHours.openTime',
//                 'businessHours.closeTime',
//                 'businessHours.isClosed',
//                 'businessHours.isOpen24Hours',
//                 'businessImages.imageId',
//                 'businessImages.url',
//                 "services.serviceName",
//                 "services.description",
//                 "services.price",
//                 "services.gstPercentage",
//                 "services.rateInclusive",
//                 "servicesImages.url",
//                 "products.productName",
//                 "products.description",
//                 "products.price",
//                 "products.gstPercentage",
//                 "products.rateInclusive",
//                 "productsImages.url",
//                 "teamMembers.name",
//                 "teamMembers.qualification",
//                 "teamMembers.specialization",
//                 "teamMembers.experience",
//                 "teamMembers.about",
//                 "teamMembersImage.url",
//             ]).getOne();

//             return {
//                 success: true,
//                 data: businessData,
//                 message: this.messageService.BUSINESS_FETCH_SUCCESS
//             }
//         } catch (error) {
//             return {
//                 success: false,
//                 message: this.messageService.BUSINESS_FETCH_ERROR,
//                 data: null
//             }
//         }
//     }

//     async getAllBusinessService({
//         categoryId, subCategoryId, limit, offset, search
//     }: {
//         categoryId?: number, subCategoryId?: number, limit: number, offset: number, search?: string
//     }): Promise<{ success: boolean, data: { businessData: Businesses[], totalCount: number } | null, message: string }> {
//         try {

//             const query = this.businessRepo.createQueryBuilder('business')
//                 .leftJoinAndSelect('business.categories', 'categories')
//                 .leftJoinAndSelect('business.subCategories', 'subCategories')
//                 .leftJoinAndSelect('business.businessHours', 'businessHours')
//                 .leftJoinAndSelect('business.teamMembers', 'teamMembers')
//                 .leftJoinAndSelect('business.createdBy', 'createdBy')
//                 .leftJoinAndSelect('business.modifiedBy', 'modifiedBy')
//                 .leftJoinAndSelect('business.images', 'images')
//                 .leftJoinAndSelect('business.reviews', 'reviews')
//                 .where('business.isActive = :isActive', { isActive: true })
//                 .andWhere('business.isDraft = :isDraft', { isDraft: false })
//                 .andWhere('business.isDelete = :isDelete', { isDelete: false })

//             if (categoryId) {
//                 query.andWhere('categories.categoryId = :categoryId', { categoryId })
//             }

//             if (subCategoryId) {
//                 query.andWhere('subCategories.subCategoryId = :subCategoryId', { subCategoryId })
//             }

//             if (search) {
//                 const searchTerms = search.trim().split(/\s+/);

//                 searchTerms.forEach((term, index) => {
//                     query.andWhere(
//                         `(LOWER(business.name) LIKE LOWER(:search${index})
//             OR LOWER(teamMembers.name) LIKE LOWER(:search${index})
//             OR LOWER(categories.category) LIKE LOWER(:search${index})
//             OR JSON_CONTAINS(categories.categoryAlias, :aliasCat${index})
//             OR LOWER(subCategories.subCategory) LIKE LOWER(:search${index})
//             OR JSON_CONTAINS(subCategories.subCategoryAlias, :aliasSubCat${index}))`,
//                         {
//                             [`search${index}`]: `%${term}%`,
//                             [`aliasCat${index}`]: `"${term}"`,
//                             [`aliasSubCat${index}`]: `"${term}"`
//                         }
//                     );
//                 });
//             }



//             if (limit) {
//                 query.skip(offset)
//                     .take(limit);
//             }

//             const [businessData, totalCount] = await query.select([
//                 'business.businessId',
//                 'business.name',
//                 'business.address',
//                 'business.phoneNo',
//                 'business.whatsAppNo',
//                 'business.landMark',
//                 'business.city',
//                 'business.pinCode',
//                 'business.latitude',
//                 'business.longitude',
//                 'business.avgRating',
//                 'business.totalReviews',
//                 'businessHours.day',
//                 'businessHours.openTime',
//                 'businessHours.closeTime',
//                 'businessHours.isClosed',
//                 'businessHours.isOpen24Hours',
//                 "images.url",
//                 "reviews.rating",
//                 "reviews.review",
//                 "reviews.createdOn",
//                 "reviews.updatedOn",
//                 "reviews.isEdited",
//             ]).getManyAndCount();

//             return {
//                 success: true,
//                 data: {
//                     businessData,
//                     totalCount
//                 },
//                 message: this.messageService.GET_ALL_BUSINESS_FETCH_SUCCESS
//             }
//         } catch (error) {
//             console.log("Error in getAll Business Service", error)
//             return {
//                 success: false,
//                 message: this.messageService.GET_ALL_BUSINESS_FETCH_ERROR,
//                 data: null
//             }
//         }
//     }
// }
