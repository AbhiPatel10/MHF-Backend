// import { Router } from 'express';
// import { container } from 'tsyringe';
// import { BusinessController } from '../../controllers/v1/business.controller';
// import { BusinessValidator } from '../../validations/v1/business.validation';

// const router = Router();

// const businessController = container.resolve(BusinessController);
// const businessValidator = container.resolve(BusinessValidator);

// router.post('/addBusinessDetails', businessController.addBusinessDetailsController);
// router.get('/:userId/getBusinessDetails', businessValidator.getBusinessDetailsValidator, businessController.getBusinessController);
// router.get('/:businessId/businessDetails', businessValidator.businessDetailsValidator, businessController.businessDetailsController);
// router.get('/getAllBusinesses', businessValidator.getAllBusinessesValidator, businessController.getAllBusinessController);

// export default router;
