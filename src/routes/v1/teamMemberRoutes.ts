import { Router } from "express";
import { container } from "tsyringe";
import { TeamMemberValidator } from "../../validations/v1/teamMember.validation";
import { TeamMemberController } from "../../controllers/v1/teamMember.controller";

const router = Router();
const teamMemberController = container.resolve(TeamMemberController);
const teamMemberValidator = container.resolve(TeamMemberValidator);

// Team Member routes
router.get('/getAllTeamMembers', teamMemberController.getAllTeamMembersController);

export default router;
