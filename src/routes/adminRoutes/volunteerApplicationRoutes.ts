import { Router } from 'express';
import { container } from 'tsyringe';
import { VolunteerApplicationController } from '../../controllers/admin/volunteerApplication.controller';
import { VolunteerApplicationValidator } from '../../validations/admin/volunteerApplication.validation';

const router = Router();

const volunteerApplicationController = container.resolve(VolunteerApplicationController);
const volunteerApplicationValidator = container.resolve(VolunteerApplicationValidator);


router.get('/volunteerApplicationList', volunteerApplicationController.getVolunteerApplicationsController);
router.patch('/updateVolunteerApplication/:id', volunteerApplicationValidator.volunteerApplicationParamsValidator, volunteerApplicationValidator.volunteerApplicationValidator, volunteerApplicationController.updateVolunteerApplicationStatusController);
router.delete('/deleteVolunteerApplication/:id', volunteerApplicationValidator.volunteerApplicationParamsValidator, volunteerApplicationController.deleteVolunteerApplicationController);

export default router;
