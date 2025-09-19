import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { CategoryService } from "../../services/admin/category.service";
import { sendResponse } from "../../utils/response";
import { handleControllerError } from "../../utils/errorHandler";

@injectable()
export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    /**
     * Create category controller of category controller
     */
    createCategoryController = async (req: Request, res: Response) => {
        try {

            const { name } = req.body;
            const { success, data, message } = await this.categoryService.createCategoryService({ name });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data
            });
        } catch (error) {
            console.log("Error in createCategoryController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Get category by id controller of category controller
    */
    getCategoryByIdController = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { success, data, message } = await this.categoryService.getCategoryByIdService(id);
            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data
            });
        } catch (error) {
            console.log("Error in getCategoryByIdController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Update category controller of category controller
    */
    updateCategoryController = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const payload = req.body;
            const { success, data, message } = await this.categoryService.updateCategoryService(id, payload);
            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data
            });
        } catch (error) {
            console.log("Error in updateCategoryController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Get all categories controller of category controller
    */
    getAllCategoriesController = async (req: Request, res: Response) => {
        try {
            const limit = parseInt(req.query.limit as string) || 10; // default 10
            const offset = parseInt(req.query.offset as string) || 0; // default 0
            const search = req.query.search as string || "";
            const { success, data, message } = await this.categoryService.getAllCategoriesService({ limit, offset, search });
            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data
            });
        } catch (error) {
            console.log("Error in getAllCategoriesController:", error);
            handleControllerError(error, res);
        }
    };


    getAllActiveCategoriesController = async (req: Request, res: Response) => {
        try {
            const search = req.query.search as string || "";
            const { success, data, message } = await this.categoryService.getAllActiveCategoriesService({ search });
            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data
            });
        } catch (error) {
            console.log("Error in getAllCategoriesController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Delete category controller of category controller
    */
    deleteCategoryController = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { success, message } = await this.categoryService.deleteCategoryService({ id });
            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data: null
            });
        } catch (error) {
            console.log("Error in deleteCategoryController:", error);
            handleControllerError(error, res);
        }
    };
}
