// import { NextFunction, Request, Response } from "express";
// import { inject, injectable } from "tsyringe";
// import { sendResponse } from "../../utils/response";
// import { CategoryService } from "../../services/v1/category.service";
// import { AdminRequest } from "../../types/types";
// import { handleControllerError } from "../../utils/errorHandler";

// @injectable()
// export class CategoryController {
//     constructor(
//         @inject(CategoryService) private readonly categoryService: CategoryService,

//     ) { }

//     getAllCategoriesController = async (req: AdminRequest, res: Response, next: NextFunction) => {
//         try {
//             const { limit, offset, search } = req.query as {
//                 limit?: string;
//                 offset?: string;
//                 search?: string;
//             }

//             const limitValue = limit ? parseInt(limit, 10) : 0;
//             const offsetValue = offset ? parseInt(offset, 10) : 0;

//             const { success, data, message } = await this.categoryService.getAllCategoriesService({
//                 limit: limitValue,
//                 offset: offsetValue,
//                 search: search ?? ""
//             });

//             return sendResponse({
//                 res,
//                 status: success ? 200 : 400,
//                 message: message,
//                 data: data
//             })
//         } catch (error) {
//             console.error('----- getAllCategoriesController Error:', error);
//             handleControllerError(error, res);
//         }
//     };

//     getAllSubCategoriesController = async (req: AdminRequest, res: Response, next: NextFunction) => {
//         try {
//             const { categoryIds } = req.query as { categoryIds: string[] };
//             const categoryIdsArray = categoryIds?.map((item: string) => Number(item)) ?? [];

//             const { limit, offset, search } = req.query as {
//                 limit?: string;
//                 offset?: string;
//                 search?: string;
//             }

//             const limitValue = limit ? parseInt(limit, 10) : 0;
//             const offsetValue = offset ? parseInt(offset, 10) : 0;


//             const { success, data, message } = await this.categoryService.getAllSubCategoriesService({
//                 categoryIds: categoryIdsArray,
//                 limit: limitValue,
//                 offset: offsetValue,
//                 search: search ?? ""
//             });

//             return sendResponse({
//                 res,
//                 status: success ? 200 : 400,
//                 message: message,
//                 data: data
//             })
//         } catch (error) {
//             console.error('----- getAllSubCategoriesController Error:', error);
//             handleControllerError(error, res);
//         }
//     };
// }