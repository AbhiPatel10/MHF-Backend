import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { BlogService } from "../../services/v1/blog.service";
import { sendResponse } from "../../utils/response";
import { handleControllerError } from "../../utils/errorHandler";

@injectable()
export class BlogController {

    constructor(
        @inject(BlogService) private readonly blogService: BlogService
    ) { }

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
}
