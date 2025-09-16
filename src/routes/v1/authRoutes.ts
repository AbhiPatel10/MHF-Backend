import { Router } from "express";
import { container } from "tsyringe";
import { AuthValidator } from "../../validations/v1/auth.validation";
import { AuthController } from "../../controllers/v1/auth.controller";

const router = Router();

const authController = container.resolve(AuthController);
const authValidator = container.resolve(AuthValidator);

router.post('/createUser', authValidator.createUserValidator, authController.createUserController);
router.post('/loginUser', authValidator.loginUserValidator, authController.loginUserController);
router.post('/sendOTP', authValidator.sendOTPValidator, authController.sendOTPController);

router.post('/forgotPassword', authValidator.forgotPasswordValidator, authController.forgotPasswordController);
router.post('/verifyOTP', authValidator.verifyOTPValidator, authController.verifyOTPController);

export default router;
