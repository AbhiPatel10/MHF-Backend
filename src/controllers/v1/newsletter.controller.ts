import { Request, Response } from "express";
import { NewsletterService } from "../../services/v1/newsletter.service";
import { handleControllerError } from "../../utils/errorHandler";
import { sendResponse } from "../../utils/response";

export class NewsletterController {
    private newsletterService: NewsletterService;

    constructor() {
        this.newsletterService = new NewsletterService();
    }

    subscribeController = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            const { success, message } = await this.newsletterService.subscribeService({ email });

            return sendResponse({
                data: null,
                res,
                status: success ? 200 : 400,
                message,
            });
        } catch (error) {
            console.error("Error in subscribeController:", error);
            handleControllerError(error, res);
        }
    };
}
