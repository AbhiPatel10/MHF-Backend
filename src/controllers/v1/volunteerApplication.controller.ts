import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { sendResponse } from "../../utils/response";
import { handleControllerError } from "../../utils/errorHandler";
import { VolunteerApplicationService } from "../../services/v1/volunteerApplication.service";

@injectable()
export class VolunteerApplicationController {

    constructor(
        @inject(VolunteerApplicationService) private readonly volunteerApplicationService: VolunteerApplicationService
    ) { }

    /**
     * Get blog by id
     */
    applyAsVolunteerController = async (req: Request, res: Response) => {
        try {
            const { fullName, email, phone, whatsapp, bloodGroup, address, reason } = req.body;

            const { success, data, message } =
                await this.volunteerApplicationService.applyAsVolunteerService({
                    fullName,
                    email,
                    phone,
                    whatsapp,
                    bloodGroup,
                    address,
                    reason,
                });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in applyAsVolunteerController:", error);
            handleControllerError(error, res);
        }
    };
}
