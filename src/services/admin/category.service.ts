import { inject, injectable } from "tsyringe";
import { CategoryDocument, CategoryModel } from "../../entities/category.schema";
import { MessageService } from "../../utils/MessageService";

@injectable()
export class CategoryService {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    /**
     * Creates category service
     * @param { name, description } 
     * @returns category service 
     */
    async createCategoryService({ name }: { name: string }): Promise<{ success: boolean; message: string; data: CategoryDocument | null }> {
        try {
            const exitCategory = await CategoryModel.findOne({ name: name, isActive: true, isDeleted: false });
            if (exitCategory) {
                return {
                    success: false,
                    message: this.messageService.CATEGORY_ALREADY_EXIST,
                    data: null
                }
            }
            const newCategory = await CategoryModel.create({ name });
            return {
                success: true,
                message: this.messageService.CATEGORY_CREATE_SUCCESS,
                data: newCategory
            };
        } catch (error) {
            console.error("Error in createCategoryService:", error);
            return {
                success: false,
                message: this.messageService.CATEGORY_CREATE_ERROR,
                data: null
            };
        }
    }

    /**
     * Gets category by id service
     * @param id 
     * @returns category by id service 
     */
    async getCategoryByIdService(id: string): Promise<{ success: boolean; message: string; data: CategoryDocument | null }> {
        try {

            const category = await CategoryModel.findById(id).where({ isDeleted: false });

            if (!category) return {
                success: false,
                message: this.messageService.CATEGORY_NOT_EXIST,
                data: null
            };

            return {
                success: true,
                message: this.messageService.CATEGORY_FETCH_SUCCESS,
                data: category
            };

        } catch (error) {
            console.error("Error in getCategoryByIdService:", error);
            return {
                success: false,
                message: this.messageService.CATEGORY_FETCH_ERROR,
                data: null
            };
        }
    }

    /**
     * Updates category service
     * @param id 
     * @param payload 
     * @returns category service 
     */
    async updateCategoryService(
        id: string,
        payload: { name?: string }
    ): Promise<{ success: boolean; message: string; data: CategoryDocument | null }> {
        try {
            const updatedCategory = await CategoryModel.findByIdAndUpdate(id, payload, { new: true });

            if (!updatedCategory) return {
                success: false,
                message: this.messageService.CATEGORY_NOT_EXIST,
                data: null
            };
            return {
                success: true,
                message: this.messageService.CATEGORY_UPDATE_SUCCESS,
                data: updatedCategory
            };
        } catch (error) {
            console.error("Error in updateCategoryService:", error);
            return {
                success: false,
                message: this.messageService.CATEGORY_UPDATE_ERROR,
                data: null
            };
        }
    }
    /**
     * Gets all categories service
     * @returns all categories service 
     */
    async getAllCategoriesService({ limit, offset, search }: { limit: number, offset: number, search: string }): Promise<{ success: boolean; message: string; data: { categories: CategoryDocument[], totalCount: number } | null }> {
        try {

            const query: any = { isDeleted: false };

            // Add search filter if provided
            if (search) {
                query.name = { $regex: search, $options: 'i' }; // case-insensitive
            }

            const totalCount = await CategoryModel.countDocuments(query);

            const categories = await CategoryModel.find(query).select('_id name isActive')
                .skip(offset)
                .limit(limit)
                .sort({ createdAt: -1 });

            return {
                success: true,
                message: this.messageService.CATEGORY_FETCH_SUCCESS,
                data: {
                    categories,
                    totalCount
                }
            };

        } catch (error) {

            console.error("Error in getAllCategoriesService:", error);

            return {
                success: false,
                message: this.messageService.CATEGORY_FETCH_ERROR,
                data: null
            };
        }
    }

    async getAllActiveCategoriesService({ search }: { search: string }): Promise<{ success: boolean; message: string; data: { categories: CategoryDocument[], totalCount: number } | null }> {
        try {

            const query: any = { isDeleted: false };

            // Add search filter if provided
            if (search) {
                query.name = { $regex: search, $options: 'i' }; // case-insensitive
            }

            const totalCount = await CategoryModel.countDocuments(query);

            const categories = await CategoryModel.find(query).select('_id name isActive')
                .sort({ createdAt: -1 });

            return {
                success: true,
                message: this.messageService.CATEGORY_FETCH_SUCCESS,
                data: {
                    categories,
                    totalCount
                }
            };

        } catch (error) {

            console.error("Error in getAllActiveCategoriesService:", error);

            return {
                success: false,
                message: this.messageService.CATEGORY_FETCH_ERROR,
                data: null
            };
        }
    }

    /**
     * Deletes category service
     * @param id 
     * @returns category service 
     */
    async deleteCategoryService({ id }: { id: string }): Promise<{ success: boolean; message: string, data: null }> {
        try {
            const category = await CategoryModel.findByIdAndUpdate({ _id: id, isActive: true, isDeleted: false }, { isDeleted: true, isActive: false });

            if (!category) return {
                success: false,
                message: this.messageService.CATEGORY_NOT_EXIST,
                data: null
            };

            return {
                data: null,
                success: true,
                message: this.messageService.CATEGORY_DELETE_SUCCESS
            };
        } catch (error) {
            console.error("Error in deleteCategoryService:", error);

            return {
                data: null,
                success: false,
                message: this.messageService.CATEGORY_DELETE_ERROR
            };
        }
    }
}
