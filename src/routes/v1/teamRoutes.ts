import { Router } from "express";
import { container } from "tsyringe";
import { TeamController } from "../../controllers/v1/team.controller";
import { TeamMemberValidator } from "../../validations/v1/team.validation";

const router = Router();

const teamController = container.resolve(TeamController);
const teamValidator = container.resolve(TeamMemberValidator);

// Add and Update Team Members
router.post('/addTeamMember', teamValidator.addTeamMemberValidator, teamController.addTeamMemberController);
router.put("/updateTeamMember/:teamMemberId", teamValidator.paramsTeamMemberIdValidator, teamValidator.updateTeamMemberValidator, teamController.updateTeamMemberController);

// Get All Team Members
router.get("/getAllTeamMembers", teamController.getAllTeamMembersController);
router.get("/getTeamMemberDetails/:teamMemberId", teamValidator.paramsTeamMemberIdValidator, teamController.getTeamMemberDetailsController);

// Delete Team Member
router.delete("/deleteTeamMember/:teamMemberId", teamValidator.paramsTeamMemberIdValidator, teamController.deleteTeamMemberController);

export default router;
