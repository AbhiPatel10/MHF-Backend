import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { sendResponse } from "../../utils/response";
import { VolunteerService } from "../../services/admin/volunteer.service";
import { handleControllerError } from "../../utils/errorHandler";

@injectable()
export class VolunteerController {
    constructor(
        @inject(VolunteerService) private readonly volunteerService: VolunteerService,

    ) { }

    /**
     * Create volunteer controller of volunteer controller
     */
    createVolunteerController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, address, bloodGroup, birthdate, phoneNo, occupation, skills, image } = req.body;

            const { success, message, data } = await this.volunteerService.createVolunteerService({
                name,
                address,
                bloodGroup,
                birthdate: new Date(birthdate),
                occupation,
                phoneNo,
                skills,
                image
            });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data,
            });
        } catch (error) {
            console.error('Error in createVolunteerController:', error);
            handleControllerError(error, res);
        }
    };

    /**
     * Get volunteer controller of volunteer controller
    */
    getVolunteerController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { success, message, data } = await this.volunteerService.getVolunteerByIdService({ id });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message, data
            });
        } catch (error) {
            console.error('Error in getVolunteerController:', error);
            handleControllerError(error, res);
        }
    };

    /**
     * Get all volunteers controller of volunteer controller
     */
    getAllVolunteersController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const limit = parseInt(req.query.limit as string) || 0;
            const offset = parseInt(req.query.offset as string) || 0;

            const { success, message, data } = await this.volunteerService.getAllVolunteersService({ limit, offset });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data
            });
        } catch (error) {
            console.error("Error in getAllVolunteersController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Update volunteer controller of volunteer controller
    */
    updateVolunteerController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            const { success, message, data } = await this.volunteerService.updateVolunteerById({ id, updateData });
            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data
            });
        } catch (error) {
            console.error('Error in updateVolunteerController:', error);
            handleControllerError(error, res);
        }
    };

    /**
     * Delete volunteer controller of volunteer controller
    */
    deleteVolunteerController = async (req: Request, res: Response, next: NextFunction) => {
        try {

            const { id } = req.params;
            const { success, message } = await this.volunteerService.deleteVolunteerById({ id });

            return sendResponse({
                res,
                data: null,
                status: success ? 200 : 400,
                message
            });
        } catch (error) {
            console.error('Error in deleteVolunteerController:', error);
            handleControllerError(error, res);
        }
    };
}