import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { ContactService } from "../../services/v1/contact.service";
import { sendResponse } from "../../utils/response";
import { handleControllerError } from "../../utils/errorHandler";

@injectable()
export class ContactController {
    constructor(private contactService: ContactService) { }

    createContactController = async (req: Request, res: Response) => {
        try {
            const { success, data, message } = await this.contactService.createContactService(req.body);
            return sendResponse({ res, status: success ? 200 : 400, message, data });
        } catch (error) {
            console.log("Error in createContactController:", error);
            handleControllerError(error, res);
        }
    };
}
