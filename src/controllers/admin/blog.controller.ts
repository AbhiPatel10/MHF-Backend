import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { BlogService } from "../../services/admin/blog.service";
import { sendResponse } from "../../utils/response";
import { handleControllerError } from "../../utils/errorHandler";

@injectable()
export class BlogController {

    constructor(
        @inject(BlogService) private readonly blogService: BlogService
    ) { }

    /**
     * Create blog controller of blog controller
     */
    createBlogController = async (req: Request, res: Response) => {
        try {
            const { title, category, image, content, isDraft } = req.body;

            const { success, data, message } = await this.blogService.createBlogService({
                title,
                category,
                image,
                content,
                isDraft,
            });

            return sendResponse({
                res,
                status: success ? 201 : 400,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in createBlogController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Get blog by id
     */
    getBlogByIdController = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { success, data, message } = await this.blogService.getBlogByIdService({ id });

            return sendResponse({
                res,
                status: success ? 200 : 404,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in getBlogByIdController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Get all blogs controller of blog controller
     */
    getAllBlogsController = async (req: Request, res: Response) => {
        try {
            const limit = parseInt(req.query.limit as string) || 10;
            const offset = parseInt(req.query.offset as string) || 0;
            const search = req.query.search as string || "";

            const { success, data, message } = await this.blogService.getAllBlogsService({ limit, offset, search });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in getAllBlogsController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Update blog controller of blog controller
     */
    updateBlogController = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const { success, data, message } = await this.blogService.updateBlogService(
                id,
                updateData
            );

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in updateBlogController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Delete blog controller of blog controller
     */
    deleteBlogController = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const { success, data, message } = await this.blogService.deleteBlogService(id);

            return sendResponse({
                res,
                status: success ? 200 : 404,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in deleteBlogController:", error);
            handleControllerError(error, res);
        }
    };
}
