// import { Router } from "express";
// import { container } from "tsyringe";
// import { ServiceValidator } from "../../validations/v1/service.validation";
// import { ServicesController } from "../../controllers/v1/services.controller";

// const router = Router();

// const servicesController = container.resolve(ServicesController);
// const serviceValidator = container.resolve(ServiceValidator);

// // Insert or Update Data
// router.post('/createService', serviceValidator.createServiceValidator, servicesController.createServicesController);
// router.put('/updateService/:serviceId', serviceValidator.updateServiceValidator, servicesController.updateServicesController);

// // Get Data
// router.get('/getAllServices', servicesController.getAllServicesController);
// router.get('/:serviceId/getServiceDetails', serviceValidator.getServiceDetailsValidator, servicesController.getServiceDetailsController);

// // Delete Service
// router.delete('/deleteService/:serviceId', serviceValidator.getServiceDetailsValidator, servicesController.deleteServicesController);

// export default router;
