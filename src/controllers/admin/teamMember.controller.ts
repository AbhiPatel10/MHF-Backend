import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { sendResponse } from "../../utils/response";
import { TeamMemberService } from "../../services/admin/teamMember.service";
import { handleControllerError } from "../../utils/errorHandler";

@injectable()
export class TeamMemberController {
    constructor(
        @inject(TeamMemberService) private readonly teamMemberService: TeamMemberService,
    ) { }

    /**
     * Create team member
     */
    createTeamMemberController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, address, bloodGroup, birthdate, phoneNo, occupation, skills, image } = req.body;

            const { success, message, data } = await this.teamMemberService.createTeamMemberService({
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
            console.error("Error in createTeamMemberController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Get team member by ID
     */
    getTeamMemberController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { success, message, data } = await this.teamMemberService.getTeamMemberByIdService({ id });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in getTeamMemberController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Get all team members
     */
    getAllTeamMembersController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const limit = parseInt(req.query.limit as string) || 0;
            const offset = parseInt(req.query.offset as string) || 0;
            const search = req.query.search as string || "";

            const { success, message, data } = await this.teamMemberService.getAllTeamMembersService({ limit, offset, search });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in getAllTeamMembersController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Update team member by ID
     */
    updateTeamMemberController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const { success, message, data } = await this.teamMemberService.updateTeamMemberById({ id, updateData });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data,
            });
        } catch (error) {
            console.error("Error in updateTeamMemberController:", error);
            handleControllerError(error, res);
        }
    };

    /**
     * Delete team member by ID
     */
    deleteTeamMemberController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const { success, message } = await this.teamMemberService.deleteTeamMemberById({ id });

            return sendResponse({
                res,
                data: null,
                status: success ? 200 : 400,
                message,
            });
        } catch (error) {
            console.error("Error in deleteTeamMemberController:", error);
            handleControllerError(error, res);
        }
    };
}
