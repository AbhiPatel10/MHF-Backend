import { inject, injectable } from "tsyringe";
import { AppDataSource } from "../../config/database";
import { MessageService } from "../../utils/MessageService";
import { Categories } from "../../entities/admin/categories.entity";
import { SubCategories } from "../../entities/admin/subCategories.entity";
import { ImageService } from "./image.service";
import { AdminImages } from "../../entities/admin/adminImages.entity";

@injectable()
export class CategoryService {
    private readonly categoryRepository = AppDataSource.getRepository(Categories);
    private readonly subCategoryRepository = AppDataSource.getRepository(SubCategories);
    private readonly adminImageRepository = AppDataSource.getRepository(AdminImages);

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
        @inject(ImageService) private readonly imageService: ImageService,
    ) { }

    async createCategoryService({ category, adminUserId, adminImageId, categoryAlias = [] }: { category: string, adminUserId: number, adminImageId?: number, categoryAlias: string[] }): Promise<{ success: boolean, message: string, data: Categories | null }> {
        try {

            const existCategory = await this.categoryRepository.findOne({
                where: {
                    category: category,
                    isActive: true,
                    isDelete: false
                },
            });

            if (existCategory) {
                return {
                    success: false,
                    message: this.messageService.CATEGORY_ALREADY_EXIST,
                    data: null
                }
            }

            const createCategory = this.categoryRepository.create({
                category,
                createdBy: { adminUserId },
                adminImage: { adminImageId },
                categoryAlias
            });
            const newCategory = await this.categoryRepository.save(createCategory);
            const { data } = await this.getCategoryByIdService({ categoryId: newCategory.categoryId ?? 0 });
            return {
                success: true,
                data: data,
                message: this.messageService.CATEGORY_CREATE_SUCCESS
            }
        } catch (error) {
            console.error('----- createCategoryService Error:', error);
            return {
                success: false,
                message: this.messageService.CATEGORY_CREATE_ERROR,
                data: null
            }
        }
    }

    async getCategoryByIdService({ categoryId }: { categoryId: number }): Promise<{ success: boolean; message: string; data: Categories | null }> {
        try {
            const category = await this.categoryRepository
                .createQueryBuilder("category")
                .leftJoinAndSelect("category.adminImage", "adminImage")
                .where("category.categoryId = :categoryId", { categoryId })
                .andWhere("category.isActive = :isActive", { isActive: true })
                .andWhere("category.isDelete = :isDelete", { isDelete: false })
                .select([
                    "category.categoryId",
                    "category.category",
                    "category.isActive",
                    "category.categoryAlias",
                    "adminImage.adminImageId",
                    "adminImage.url"
                ])
                .getOne();

            if (!category) {
                return {
                    success: false,
                    message: this.messageService.CATEGORY_NOT_EXIST,
                    data: null
                };
            }

            return {
                success: true,
                message: this.messageService.CATEGORY_FETCH_SUCCESS,
                data: category
            };
        } catch (error) {
            console.error("----- getCategoryByIdService Error:", error);
            return {
                success: false,
                message: this.messageService.CATEGORY_FETCH_ERROR,
                data: null
            };
        }
    }

    async updateCategoryService({ categoryId, category, adminUserId, adminImageId, categoryAlias }: { categoryId: number, category: string, adminUserId: number, adminImageId: number, categoryAlias: string[] }): Promise<{ success: boolean, message: string, data: Categories | null }> {
        try {

            const existCategory = await this.categoryRepository.findOne({
                where: {
                    categoryId,
                    isDelete: false
                },
                relations: ["adminImage"]
            });

            if (!existCategory) {
                return {
                    success: false,
                    message: this.messageService.CATEGORY_NOT_EXIST,
                    data: null
                }
            }

            if (category) {
                existCategory.category = category;
            }
            existCategory.modifiedBy = { adminUserId }

            if (adminImageId !== undefined) {
                if (adminImageId === null) {
                    // Remove existing image
                    if (existCategory.adminImage) {
                        await this.imageService.imageDeleteService({
                            adminImageId: existCategory.adminImage.adminImageId
                        });
                        existCategory.adminImage = null;
                    }
                } else {
                    // Replace with new image
                    const newImage = await this.adminImageRepository.findOne({
                        where: { adminImageId }
                    });
                    if (newImage) {
                        // Delete old one if exists and is different
                        if (existCategory.adminImage &&
                            existCategory.adminImage.adminImageId !== newImage.adminImageId) {
                            await this.imageService.imageDeleteService({
                                adminImageId: existCategory.adminImage.adminImageId
                            });
                        }
                        existCategory.adminImage = newImage;
                    }
                }
            }

            if (categoryAlias !== undefined) {
                existCategory.categoryAlias = categoryAlias;
            }

            await this.categoryRepository.save(existCategory);

            return {
                success: true,
                data: {
                    category,
                },
                message: this.messageService.CATEGORY_UPDATE_SUCCESS
            }
        } catch (error) {
            console.error('----- updateCategoryService Error:', error);
            return {
                success: false,
                message: this.messageService.CATEGORY_UPDATE_ERROR,
                data: null
            }
        }
    }

    async getCategoriesService(): Promise<{ success: boolean; message: string; data: Categories[] | null }> {
        try {
            const categories = await this.categoryRepository.find({
                where: { isActive: true, isDelete: false },
                relations: ["adminImage"], // include if you need image relation
                order: { categoryId: "ASC" }
            });

            return {
                success: true,
                message: this.messageService.CATEGORY_FETCH_SUCCESS,
                data: categories
            };
        } catch (error) {
            console.error("----- getCategoriesService Error:", error);
            return {
                success: false,
                message: this.messageService.CATEGORY_FETCH_ERROR,
                data: null
            };
        }
    }

    async getAllCategoriesService({
        limit, offset, search
    }: {
        limit: number, offset: number, search: string
    }): Promise<{ success: boolean, message: string, data: { categories: Categories[] | null, totalCount: number } | null }> {
        try {

            const query = this.categoryRepository
                .createQueryBuilder("category")
                .leftJoinAndSelect("category.adminImage", "adminImage")
                .where("category.isDelete = :isDelete", { isDelete: false })
                .select([
                    "category.categoryId",
                    "category.category",
                    "category.isActive",
                    "category.categoryAlias",
                    "adminImage.adminImageId",
                    "adminImage.url"
                ]);

            // 🔍 Apply search if provided
            if (search) {
                query.andWhere("category.category LIKE :search", { search: `%${search}%` });
            }

            // 📄 Pagination
            if (limit) {
                query.skip(offset)
                    .take(limit);
            }

            const [categories, totalCount] = await query.getManyAndCount();

            return {
                success: true,
                data: {
                    categories,
                    totalCount
                },
                message: this.messageService.CATEGORY_CREATE_SUCCESS
            }
        } catch (error) {
            console.error('----- getAllCategoriesService Error:', error);
            return {
                success: false,
                message: this.messageService.CATEGORY_CREATE_ERROR,
                data: null
            }
        }
    }


    async activeInactiveCategoryService({ categoryId, isActive, adminUserId }: { categoryId: number, isActive: boolean, adminUserId: number }): Promise<{ success: boolean, message: string, data: Categories | null }> {
        try {

            const existCategory = await this.categoryRepository.findOne({ where: { categoryId, isDelete: false } });

            if (!existCategory) {
                return {
                    success: false,
                    message: this.messageService.CATEGORY_NOT_EXIST,
                    data: null
                }
            }

            existCategory.isActive = isActive;
            existCategory.modifiedBy = { adminUserId }
            await this.categoryRepository.save(existCategory);

            return {
                success: true,
                data: null,
                message: this.messageService.CATEGORY_UPDATE_SUCCESS
            }
        } catch (error) {
            console.error('----- activeInactiveCategoryService Error:', error);
            return {
                success: false,
                message: this.messageService.CATEGORY_CREATE_ERROR,
                data: null
            }
        }
    }

    async softDeleteCategoryService({ categoryId, adminUserId }: { categoryId: number, adminUserId: number }): Promise<{ success: boolean, message: string }> {
        try {
            const category = await this.categoryRepository.findOne({
                where: {
                    categoryId,
                    isDelete: false
                }
            });
            if (!category) {
                return {
                    success: false,
                    message: this.messageService.CATEGORY_NOT_EXIST
                };
            }
            category.isDelete = true;
            category.isActive = false;
            category.modifiedBy = { adminUserId };
            await this.categoryRepository.save(category);

            // Soft delete all subcategories under this category
            const subCategories = await this.subCategoryRepository.find({ where: { category: { categoryId }, isActive: true, isDelete: false } });
            for (const subCategory of subCategories) {
                subCategory.isDelete = true;
                subCategory.isActive = false;
                subCategory.modifiedBy = { adminUserId };
                await this.subCategoryRepository.save(subCategory);
            }

            return {
                success: true,
                message: this.messageService.CATEGORY_DELETE_SUCCESS
            };
        } catch (error) {
            console.error('----- softDeleteCategoryService Error:', error);
            return {
                success: false,
                message: this.messageService.CATEGORY_DELETE_ERROR
            };
        }
    }


    // Sub Category
    async createSubCategoryService({ categoryId, subCategory, adminUserId, adminImageId, subCategoryAlias = [] }: { categoryId: number, subCategory: string, adminUserId: number, adminImageId?: number, subCategoryAlias: string[] }): Promise<{ success: boolean, message: string, data: SubCategories | null }> {
        try {

            const existSubCategoty = await this.subCategoryRepository.findOne({
                where: {
                    category: {
                        categoryId,
                        isActive: true,
                        isDelete: false
                    },
                    subCategory,
                    isDelete: false
                }
            });

            if (existSubCategoty) {
                return {
                    success: false,
                    message: this.messageService.SUB_CATEGORY_ALREADY_EXIST,
                    data: null
                }
            }

            const createSubCategory = this.subCategoryRepository.create({
                category: { categoryId },
                subCategory,
                createdBy: { adminUserId },
                adminImage: { adminImageId },
                subCategoryAlias
            });
            await this.subCategoryRepository.save(createSubCategory);

            return {
                success: true,
                data: {
                    subCategory,
                },
                message: this.messageService.SUB_CATEGORY_CREATE_SUCCESS
            }
        } catch (error) {
            console.error('----- createSubCategoryService Error:', error);
            return {
                success: false,
                message: this.messageService.SUB_CATEGORY_CREATE_ERROR,
                data: null
            }
        }
    }

    async getAllSubCategoriesService({
        categoryId, limit, offset, search
    }: { categoryId: number, limit: number, offset: number, search: string }): Promise<{ success: boolean, message: string, data: { subCategories: SubCategories[] | null, totalCount: number } | null }> {
        try {
            const query = this.subCategoryRepository
                .createQueryBuilder("subCategory")
                .leftJoinAndSelect("subCategory.category", "category")
                .leftJoinAndSelect("subCategory.adminImage", "adminImage")
                .where("category.categoryId = :categoryId", { categoryId })
                .andWhere("subCategory.isDelete = :isDelete", { isDelete: false })
                .select([
                    "subCategory.subCategoryId",
                    "subCategory.subCategory",
                    "subCategory.isActive",
                    "subCategory.subCategoryAlias",
                    "adminImage.adminImageId",
                    "adminImage.url"
                ])

            if (search) {
                query.andWhere("subCategory.subCategory LIKE :search", { search: `%${search}%` });
            }

            // 📄 Pagination
            if (limit) {
                query.skip(offset)
                    .take(limit);
            }

            const [subCategories, totalCount] = await query.getManyAndCount();
            return {
                success: true,
                data: {
                    subCategories,
                    totalCount,
                },
                message: this.messageService.CATEGORY_CREATE_SUCCESS
            }
        } catch (error) {
            console.error('----- getAllSubCategoriesService Error:', error);
            return {
                success: false,
                message: this.messageService.CATEGORY_CREATE_ERROR,
                data: null
            }
        }
    }

    async getSubCategoryDetailsService({ subCategoryId }: { subCategoryId: number }): Promise<{ success: boolean, message: string, data: SubCategories | null }> {
        const subCategory = await this.subCategoryRepository
            .createQueryBuilder("subCategory")
            .leftJoinAndSelect("subCategory.adminImage", "adminImage")
            .leftJoinAndSelect("subCategory.category", "category")
            .where("subCategory.subCategoryId = :subCategoryId", { subCategoryId })
            .andWhere("subCategory.isDelete = :isDelete", { isDelete: false })
            .select([
                "subCategory.subCategoryId",
                "subCategory.subCategory",
                "subCategory.isActive",
                "subCategory.subCategoryAlias",
                "adminImage.adminImageId",
                "adminImage.url",
                "category.categoryId",
                "category.category"
            ])
            .getOne();

        if (!subCategory) {
            return {
                data: null,
                message: this.messageService.SUB_CATEGORY_NOT_EXIST,
                success: false
            }
        }

        return {
            data: subCategory,
            message: this.messageService.SUB_CATEGORY_GET_SUCCESS,
            success: true
        };

    }

    async updateSubCategoryService({ subCategoryId, subCategory, adminUserId, adminImageId, subCategoryAlias = [] }: { subCategoryId: number, subCategory: string, adminUserId: number, adminImageId?: number, subCategoryAlias: string[] }): Promise<{ success: boolean, message: string, data: SubCategories | null }> {
        try {
            const existSubCategory = await this.subCategoryRepository.findOne({
                where: {
                    subCategoryId,
                    isDelete: false
                },
                relations: ["adminImage"]
            });

            if (!existSubCategory) {
                return {
                    success: false,
                    message: this.messageService.SUB_CATEGORY_NOT_EXIST,
                    data: null
                }
            };

            existSubCategory.subCategory = subCategory
            existSubCategory.modifiedBy = { adminUserId }

            if (adminImageId !== undefined) {
                if (adminImageId === null) {
                    // Remove existing image
                    if (existSubCategory.adminImage) {
                        await this.imageService.imageDeleteService({
                            adminImageId: existSubCategory.adminImage.adminImageId
                        });
                        existSubCategory.adminImage = null;
                    }
                } else {
                    // Replace with new image
                    const newImage = await this.adminImageRepository.findOne({
                        where: { adminImageId }
                    });
                    if (newImage) {
                        // Delete old one if exists and is different
                        if (existSubCategory.adminImage &&
                            existSubCategory.adminImage.adminImageId !== newImage.adminImageId) {
                            await this.imageService.imageDeleteService({
                                adminImageId: existSubCategory.adminImage.adminImageId
                            });
                        }
                        existSubCategory.adminImage = newImage;
                    }
                }
            }

            if (subCategoryAlias !== undefined) {
                existSubCategory.subCategoryAlias = subCategoryAlias;
            }

            await this.subCategoryRepository.save(existSubCategory);

            return {
                success: true,
                data: {
                    subCategory,
                },
                message: this.messageService.SUB_CATEGORY_UPDATE_SUCCESS
            }
        } catch (error) {
            console.error('----- updateSubCategoryService Error:', error);
            return {
                success: false,
                message: this.messageService.SUB_CATEGORY_UPDATE_ERROR,
                data: null
            }
        }
    }

    async activeInactiveSubCategoryService({ subCategoryId, isActive, adminUserId }: { subCategoryId: number, isActive: boolean, adminUserId: number }): Promise<{ success: boolean, message: string, data: Categories | null }> {
        try {

            const existSubCategory = await this.subCategoryRepository.findOne({ where: { subCategoryId, isDelete: false } });

            if (!existSubCategory) {
                return {
                    success: false,
                    message: this.messageService.SUB_CATEGORY_NOT_EXIST,
                    data: null
                }
            }

            existSubCategory.isActive = isActive;
            existSubCategory.modifiedBy = { adminUserId }
            await this.subCategoryRepository.save(existSubCategory);

            return {
                success: true,
                data: null,
                message: this.messageService.SUB_CATEGORY_UPDATE_SUCCESS
            }
        } catch (error) {
            console.error('----- activeInactiveSubCategoryService Error:', error);
            return {
                success: false,
                message: this.messageService.SUB_CATEGORY_UPDATE_ERROR,
                data: null
            }
        }
    }

    // Soft delete subcategory
    async softDeleteSubCategoryService({ subCategoryId, adminUserId }: { subCategoryId: number, adminUserId: number }): Promise<{ success: boolean, message: string }> {
        try {
            const subCategory = await this.subCategoryRepository.findOne({
                where: {
                    subCategoryId,
                    isDelete: false
                }
            });
            if (!subCategory) {
                return {
                    success: false,
                    message: this.messageService.SUB_CATEGORY_NOT_EXIST
                };
            }
            subCategory.isDelete = true;
            subCategory.isActive = false;
            subCategory.modifiedBy = { adminUserId };
            await this.subCategoryRepository.save(subCategory);

            return {
                success: true,
                message: this.messageService.SUB_CATEGORY_DELETE_SUCCESS
            };
        } catch (error) {
            console.error('----- softDeleteSubCategoryService Error:', error);
            return {
                success: false,
                message: this.messageService.SUB_CATEGORY_DELETE_ERROR
            };
        }
    }

}
