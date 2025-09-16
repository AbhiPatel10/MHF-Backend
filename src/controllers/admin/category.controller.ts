import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { sendResponse } from "../../utils/response";
import { CategoryService } from "../../services/admin/category.service";
import { AdminRequest } from "../../types/types";
import { handleControllerError } from "../../utils/errorHandler";

@injectable()
export class CategoryController {
    constructor(
        @inject(CategoryService) private readonly categoryService: CategoryService,

    ) { }

    createCategoryController = async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { category, adminImageId, categoryAlias } = req.body;
            const { success, data, message } = await this.categoryService.createCategoryService({ category, adminUserId: req.adminUser?.adminUserId ?? 0, adminImageId, categoryAlias });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- createCategoryController Error:', error);
            handleControllerError(error, res);
        }
    };

    getCategoryByIdController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryId = parseInt(req.params.categoryId, 10);

            const { success, data, message } = await this.categoryService.getCategoryByIdService({ categoryId });

            return sendResponse({
                res,
                status: success ? 200 : 404,
                message,
                data
            });
        } catch (error) {
            console.error("----- getCategoryByIdController Error:", error);
            handleControllerError(error, res);
        }
    };

    getCategoriesController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { success, data, message } = await this.categoryService.getCategoriesService();

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data
            });
        } catch (error) {
            console.error("----- getCategoriesController Error:", error);
            handleControllerError(error, res);
        }
    };

    getAllCategoriesController = async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { limit, offset, search } = req.query as {
                limit?: string;
                offset?: string;
                search?: string;
            }

            const limitValue = limit ? parseInt(limit, 10) : 0;
            const offsetValue = offset ? parseInt(offset, 10) : 0;

            const { success, data, message } = await this.categoryService.getAllCategoriesService({
                limit: limitValue,
                offset: offsetValue,
                search: search ?? ""
            });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- getAllCategoriesController Error:', error);
            handleControllerError(error, res);
        }
    };

    /**
     * Active inactive category controller of category controller
     */
    activeInactiveCategoryController = async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { categoryId, isActive } = req.body;
            const adminUserId = req.adminUser?.adminUserId;

            const { success, data, message } = await this.categoryService.activeInactiveCategoryService({
                categoryId,
                isActive,
                adminUserId: adminUserId ?? 0
            });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- activeInactiveCategoryController Error:', error);
            handleControllerError(error, res);
        }
    };

    updateCategoryController = async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { categoryId, category, adminImageId, categoryAlias } = req.body;
            const adminUserId = Number(req.adminUser?.adminUserId ?? 0);
            const { success, data, message } = await this.categoryService.updateCategoryService({
                categoryId,
                category,
                adminUserId,
                adminImageId: Number(adminImageId ?? 0),
                categoryAlias
            });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- updateCategoryController Error:', error);
            handleControllerError(error, res);
        }
    };


    createSubCategoryController = async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { categoryId, subCategory, adminImageId, subCategoryAlias } = req.body;
            const adminUserId = req.adminUser?.adminUserId;
            const { success, data, message } = await this.categoryService.createSubCategoryService({
                categoryId,
                subCategory,
                adminUserId: adminUserId ?? 0,
                adminImageId,
                subCategoryAlias
            });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- createSubCategoryController Error:', error);
            handleControllerError(error, res);
        }
    };

    getAllSubCategoriesController = async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { categoryId } = req.params;

            const { limit, offset, search } = req.query as {
                limit?: string;
                offset?: string;
                search?: string;
            }

            const limitValue = limit ? parseInt(limit, 10) : 0;
            const offsetValue = offset ? parseInt(offset, 10) : 0;

            const { success, data, message } = await this.categoryService.getAllSubCategoriesService({
                categoryId: Number(categoryId ?? 0),
                limit: limitValue,
                offset: offsetValue,
                search: search ?? ""
            });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- getAllSubCategoriesController Error:', error);
            handleControllerError(error, res);
        }
    };


    getSubCategoryDetailsController = async (req: AdminRequest, res: Response) => {
        try {
            const { subCategoryId } = req.params;
            const { success, data, message } = await this.categoryService.getSubCategoryDetailsService({ subCategoryId: Number(subCategoryId) });
            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- getSubCategoryDetailsController Error:', error);
            handleControllerError(error, res);
        }

    }

    updateSubCategoryController = async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { subCategoryId, subCategory, adminImageId, subCategoryAlias } = req.body;
            const adminUserId = req.adminUser?.adminUserId;
            const { success, data, message } = await this.categoryService.updateSubCategoryService({
                subCategoryId,
                subCategory,
                adminUserId: adminUserId ?? 0,
                adminImageId,
                subCategoryAlias
            });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- updateSubCategoryController Error:', error);
            handleControllerError(error, res);
        }
    };

    // Soft delete category
    softDeleteCategoryController = async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { categoryId } = req.params;
            const adminUserId = req.adminUser?.adminUserId ?? 0;
            const { success, message } = await this.categoryService.softDeleteCategoryService({ categoryId: Number(categoryId ?? 0), adminUserId });
            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: null
            });
        } catch (error) {
            console.error('----- softDeleteCategoryController Error:', error);
            handleControllerError(error, res);
        }
    };

    activeInactiveSubCategoryController = async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { subCategoryId, isActive } = req.body;
            const adminUserId = req.adminUser?.adminUserId;
            const { success, data, message } = await this.categoryService.activeInactiveSubCategoryService({ subCategoryId, isActive, adminUserId: adminUserId ?? 0 });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- activeInactiveSubCategoryController Error:', error);
            handleControllerError(error, res);
        }
    };

    // Soft delete subcategory
    softDeleteSubCategoryController = async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { subCategoryId } = req.params;
            const adminUserId = req.adminUser?.adminUserId ?? 0;
            const { success, message } = await this.categoryService.softDeleteSubCategoryService({ subCategoryId: Number(subCategoryId ?? 0), adminUserId });
            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: null
            });
        } catch (error) {
            console.error('----- softDeleteSubCategoryController Error:', error);
            handleControllerError(error, res);
        }
    };
}