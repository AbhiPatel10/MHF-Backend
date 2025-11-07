import { Request, Response } from "express";
import { NewsletterService } from "../../services/admin/newsletter.service";
import { handleControllerError } from "../../utils/errorHandler";
import { sendResponse } from "../../utils/response";
import { inject, injectable } from "tsyringe";

@injectable()
export class NewsletterController {

    constructor(
        @inject(NewsletterService) private readonly newsletterService: NewsletterService,
    ) { }

    getAllNewslettersController = async (req: Request, res: Response) => {
        try {
            const { limit, offset, sortOrder = "desc" } = req.query;

            const { success, message, data } = await this.newsletterService.getAllNewslettersService({
                limit: Number(limit),
                offset: Number(offset),
                sortOrder: sortOrder === "asc" ? "asc" : "desc",
            });

            return sendResponse({
                res,
                status: success ? 200 : 404,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in getAllNewslettersController:", error);
            handleControllerError(error, res);
        }
    };
}
