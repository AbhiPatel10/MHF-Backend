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
            const search = req.query.search as string || "";

            const { success, data, message } =
                await this.volunteerApplicationService.getVolunteerApplicationsService({
                    limit,
                    offset,
                    search
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

    updateVolunteerApplicationStatusController = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const { success, message, data } =
                await this.volunteerApplicationService.toggleVolunteerApplicationStatusService({
                    id,
                    status,
                });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in updateVolunteerApplicationStatusController:", error);
            handleControllerError(error, res);
        }
    };

    deleteVolunteerApplicationController = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const { success, message, data } =
                await this.volunteerApplicationService.deleteVolunteerApplicationService(id);

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in deleteVolunteerApplicationController:", error);
            handleControllerError(error, res);
        }
    };


}
