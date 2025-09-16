import { Router } from "express";
import { container } from "tsyringe";
import { UserController } from "../../controllers/v1/user.controller";
import { UserValidator } from "../../validations/v1/user.validation";

const router = Router();

const userController = container.resolve(UserController);
const userValidator = container.resolve(UserValidator);

router.get('/getUserDetails', userController.getUserDetailsController);
router.put("/updateUser", userValidator.updateUserValidator, userController.updateUserController);

export default router;

