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
     * Get all team members
     */
    getAllTeamMembersController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const limit = parseInt(req.query.limit as string) || 0;
            const offset = parseInt(req.query.offset as string) || 0;
            const search = req.query.search as string || "";
            const memberType = req.query.memberType as string || "";

            const { success, message, data } = await this.teamMemberService.getAllTeamMembersService({ limit, offset, search, memberType });

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
}
