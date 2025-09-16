import { Router } from "express";
import { container } from "tsyringe";
import { AuthController } from "../../controllers/admin/auth.controller";
import { AuthValidator } from "../../validations/admin/auth.validation";

const router = Router();
const authController = container.resolve(AuthController);
const authValidator = container.resolve(AuthValidator);

router.post('/createAdmin', authValidator.createAdminValidator, authController.createAdminUserController);
router.post('/adminLogin', authValidator.adminLoginValidator, authController.adminLoginController);

export default router;
