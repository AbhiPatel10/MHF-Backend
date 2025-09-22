import { Request, Response } from "express";
import { injectable } from "tsyringe";
import { ContactService } from "../../services/admin/contact.service";
import { sendResponse } from "../../utils/response";
import { handleControllerError } from "../../utils/errorHandler";

@injectable()
export class ContactController {
    constructor(private contactService: ContactService) { }

    getAllContactsController = async (req: Request, res: Response) => {
        try {
            const limit = parseInt(req.query.limit as string) || 10;
            const offset = parseInt(req.query.offset as string) || 0;
            const search = (req.query.search as string) || "";
            const isContactedQuery = req.query.isContacted;
            let isContacted: boolean | undefined = undefined;

            if (isContactedQuery === "true") isContacted = true;
            else if (isContactedQuery === "false") isContacted = false;

            const { success, data, message } = await this.contactService.getAllContactsService({ limit, offset, search, isContacted });
            return sendResponse({ res, status: success ? 200 : 400, message, data });
        } catch (error) {
            console.log("Error in getAllContactsController:", error);
            handleControllerError(error, res);
        }
    };

    updateStatusController = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { isContacted } = req.body;
            const { success, data, message } = await this.contactService.updateStatusService(id, isContacted);
            return sendResponse({ res, status: success ? 200 : 400, message, data });
        } catch (error) {
            console.log("Error in updateStatusController:", error);
            handleControllerError(error, res);
        }
    };

    deleteContactController = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { success, message } = await this.contactService.deleteContactService(id);
            return sendResponse({ res, status: success ? 200 : 400, message, data: null });
        } catch (error) {
            console.log("Error in deleteContactController:", error);
            handleControllerError(error, res);
        }
    };
}
