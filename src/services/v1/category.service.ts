import { inject, injectable } from "tsyringe";
import { In } from "typeorm";

import { AppDataSource } from "../../config/database";
import { MessageService } from "../../utils/MessageService";
import { Categories } from "../../entities/admin/categories.entity";
import { SubCategories } from "../../entities/admin/subCategories.entity";

@injectable()
export class CategoryService {
    private readonly categoryRepository = AppDataSource.getRepository(Categories);
    private readonly subCategoryRepository = AppDataSource.getRepository(SubCategories);

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

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
                .andWhere("category.isActive = :isActive", { isActive: true })

            if (search) {
                const searchTerms = search.trim().split(/\s+/); // Split search string into words

                searchTerms.forEach((term, index) => {
                    query.andWhere(`
                        (
                            (LOWER(category.category) LIKE LOWER(:search${index}))
                            OR
                            (LOWER(JSON_UNQUOTE(JSON_EXTRACT(category.categoryAlias, '$[*]'))) LIKE LOWER(:search${index}))
                        )
                    `, {
                        [`search${index}`]: `%${term}%`, // Assign dynamic search parameters
                    });
                });
            }

            // 📄 Pagination
            if (limit) {
                query.skip(offset)
                    .take(limit);
            }

            const [categories, totalCount] = await query.select([
                "category.categoryId",
                "category.category",
                "adminImage.url",
            ]).getManyAndCount();

            return {
                success: true,
                data: {
                    categories: categories,
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

    async getAllSubCategoriesService({
        categoryIds, limit, offset, search
    }: {
        categoryIds: number[], limit: number, offset: number, search: string
    }): Promise<{ success: boolean, message: string, data: { subCategories: SubCategories[] | null, totalCount: number } | null }> {
        try {

            const query = this.subCategoryRepository
                .createQueryBuilder("subCategory")
                .leftJoinAndSelect("subCategory.category", "category")
                .leftJoinAndSelect("subCategory.adminImage", "adminImage")
                .where("category.categoryId IN (:...categoryIds)", { categoryIds })
                .andWhere("subCategory.isDelete = :isDelete", { isDelete: false });

            if (search) {
                const searchTerms = search.trim().split(/\s+/); // Split search string into words

                searchTerms.forEach((term, index) => {
                    query.andWhere(`
                        (
                            (LOWER(subCategory.subCategory) LIKE LOWER(:search${index}))
                            OR
                            (LOWER(JSON_UNQUOTE(JSON_EXTRACT(subCategory.subCategoryAlias, '$[*]'))) LIKE LOWER(:search${index}))
                        )
                    `, {
                        [`search${index}`]: `%${term}%`, // Assign dynamic search parameters
                    });
                });
            }

            // 📄 Pagination
            if (limit) {
                query.skip(offset)
                    .take(limit);
            }

            const [subCategories, totalCount] = await query.select([
                "subCategory.subCategoryId",
                "subCategory.subCategory",
                "adminImage.url",
            ]).getManyAndCount();

            return {
                success: true,
                data: {
                    subCategories,
                    totalCount
                },
                message: this.messageService.SUB_CATEGORY_GET_ALL_SUCCESS
            }
        } catch (error) {
            console.error('----- getAllSubCategoriesService Error:', error);
            return {
                success: false,
                message: this.messageService.SUB_CATEGORY_GET_ERROR,
                data: null
            }
        }
    }

}
