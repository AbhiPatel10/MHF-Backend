import { Router } from "express";
import { container } from "tsyringe";
import { VolunteerValidator } from "../../validations/admin/volunteer.validation";
import { VolunteerController } from "../../controllers/admin/volunteer.controller";

const router = Router();
const volunteerController = container.resolve(VolunteerController);
const volunteerValidator = container.resolve(VolunteerValidator);

// Category routes
router.post('/createVolunteer', volunteerValidator.createVolunteerValidator, volunteerController.createVolunteerController);
router.get('/getVolunteerDetails/:id', volunteerController.getVolunteerController);
router.get('/getAllVolunteers', volunteerController.getAllVolunteersController);
router.put('/updateVolunteer/:id', volunteerValidator.updateVolunteerValidator, volunteerController.updateVolunteerController);
router.delete('/deleteVolunteer/:id', volunteerController.deleteVolunteerController);

export default router;
