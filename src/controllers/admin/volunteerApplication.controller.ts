import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { sendResponse } from "../../utils/response";
import { handleControllerError } from "../../utils/errorHandler";
import { VolunteerApplicationService } from "../../services/admin/volunteerApplication.service";

@injectable()
export class VolunteerApplicationController {

    constructor(
        @inject(VolunteerApplicationService) private readonly volunteerApplicationService: VolunteerApplicationService
    ) { }

    getVolunteerApplicationsController = async (req: Request, res: Response) => {
        try {
            const limit = parseInt(req.query.limit as string) || 10;
            const offset = parseInt(req.query.offset as string) || 0;

            const { success, data, message } =
                await this.volunteerApplicationService.getVolunteerApplicationsService({
                    limit,
                    offset,
                });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in getVolunteerApplicationsController:", error);
            handleControllerError(error, res);
        }
    };

}
