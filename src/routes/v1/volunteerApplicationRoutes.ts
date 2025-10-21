import { Router } from 'express';
import { container } from 'tsyringe';
import { VolunteerApplicationController } from '../../controllers/v1/volunteerApplication.controller';
import { VolunteerApplicationValidator } from '../../validations/v1/volunteerApplication.validation';

const router = Router();

const volunteerApplicationController = container.resolve(VolunteerApplicationController);
const volunteerApplicationValidator = container.resolve(VolunteerApplicationValidator);


router.post('/applyAsVolunteers', volunteerApplicationValidator.applyAsVolunteerValidator, volunteerApplicationController.applyAsVolunteerController);

export default router;
