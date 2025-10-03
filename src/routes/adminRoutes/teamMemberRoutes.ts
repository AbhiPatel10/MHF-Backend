import { Router } from "express";
import { container } from "tsyringe";
import { TeamMemberValidator } from "../../validations/admin/teamMember.validation";
import { TeamMemberController } from "../../controllers/admin/teamMember.controller";

const router = Router();
const teamMemberController = container.resolve(TeamMemberController);
const teamMemberValidator = container.resolve(TeamMemberValidator);

// Team Member routes
router.post('/createTeamMember', teamMemberValidator.createTeamMemberValidator, teamMemberController.createTeamMemberController);
router.get('/getTeamMemberDetails/:id', teamMemberController.getTeamMemberController);
router.get('/getAllTeamMembers', teamMemberController.getAllTeamMembersController);
router.put('/updateTeamMember/:id', teamMemberValidator.updateTeamMemberValidator, teamMemberController.updateTeamMemberController);
router.delete('/deleteTeamMember/:id', teamMemberController.deleteTeamMemberController);

export default router;
