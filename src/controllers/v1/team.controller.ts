// import { NextFunction, Response } from "express";
// import { inject, injectable } from "tsyringe";

// import { sendResponse } from "../../utils/response";
// import { UserRequest } from "../../types/types";
// import { TeamService } from "../../services/v1/team.service";
// import { handleControllerError } from "../../utils/errorHandler";

// @injectable()
// export class TeamController {
//     constructor(
//         @inject(TeamService) private readonly teamService: TeamService,
//     ) { }

//     /**
//      * Add team member controller of team controller
//      */
//     addTeamMemberController = async (req: UserRequest, res: Response, next: NextFunction) => {
//         try {
//             const { name, qualification, specialization, experience, about, imageId } = req.body;

//             const businessId = req.user?.business.businessId;
//             const createdBy = req.user?.userId;

//             const { success, message, data } = await this.teamService.addTeamMemberService({
//                 name,
//                 qualification,
//                 specialization,
//                 experience,
//                 about,
//                 imageId,
//                 businessId,
//                 createdBy
//             });

//             return sendResponse({
//                 res,
//                 status: success ? 200 : 400,
//                 message,
//                 data,
//             });
//         } catch (error) {
//             console.error('----- addTeamMemberController Error:', error);
//             handleControllerError(error, res);
//         }
//     };

//     /**
//      * Update team member controller of team controller
//      */
//     updateTeamMemberController = async (req: UserRequest, res: Response, next: NextFunction) => {
//         try {
//             const teamMemberId = Number(req.params.teamMemberId);
//             const modifiedBy = req.user?.userId;
//             const { name, qualification, specialization, experience, about, imageId } = req.body;
//             const { success, message, data } = await this.teamService.updateTeamMemberService(teamMemberId, {
//                 name,
//                 qualification,
//                 specialization,
//                 experience,
//                 about,
//                 imageId,
//                 modifiedBy,
//             });

//             return sendResponse({
//                 res,
//                 status: success ? 200 : 400,
//                 message,
//                 data,
//             });
//         } catch (error) {
//             console.error('----- updateTeamMemberController Error:', error);
//             handleControllerError(error, res);
//         }
//     };

//     /**
//      * Get all team members controller of team controller
//      */
//     getAllTeamMembersController = async (req: UserRequest, res: Response, next: NextFunction) => {
//         try {
//             const businessId = req.user?.business.businessId;

//             const { success, message, data } = await this.teamService.getAllTeamMembersService({
//                 businessId: Number(businessId ?? 0),
//             });

//             return sendResponse({
//                 res,
//                 status: success ? 200 : 400,
//                 message,
//                 data,
//             });
//         } catch (error) {
//             console.error('----- getAllTeamMembersController Error:', error);
//             handleControllerError(error, res);
//         }
//     };

//     /**
//      * Get team member details controller of team controller
//      */
//     getTeamMemberDetailsController = async (req: UserRequest, res: Response, next: NextFunction) => {
//         try {
//             const teamMemberId = Number(req.params.teamMemberId);

//             const { success, message, data } = await this.teamService.getTeamMemberDetailsService({ teamMemberId });

//             return sendResponse({
//                 res,
//                 status: success ? 200 : 400,
//                 message,
//                 data,
//             });
//         } catch (error) {
//             console.error('----- getTeamMemberDetailsController Error:', error);
//             handleControllerError(error, res);
//         }
//     };

//     /**
//  * Delete team member controller of team controller
//  */
//     deleteTeamMemberController = async (req: UserRequest, res: Response, next: NextFunction) => {
//         try {
//             const teamMemberId = Number(req.params.teamMemberId);
//             const modifiedBy = req.user?.userId;

//             const { success, message, data } = await this.teamService.deleteTeamMemberService({
//                 teamMemberId,
//                 modifiedBy,
//             });

//             return sendResponse({
//                 res,
//                 status: success ? 200 : 400,
//                 message,
//                 data,
//             });
//         } catch (error) {
//             console.error("----- deleteTeamMemberController Error:", error);
//             handleControllerError(error, res);
//         }
//     };


// }