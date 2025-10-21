import { Router } from 'express';
import { container } from 'tsyringe';
import { VolunteerApplicationController } from '../../controllers/admin/volunteerApplication.controller';

const router = Router();

const volunteerApplicationController = container.resolve(VolunteerApplicationController);


router.get('/volunteerApplicationList', volunteerApplicationController.getVolunteerApplicationsController);

export default router;
