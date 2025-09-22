import { Router } from "express";
import { container } from "tsyringe";
import { ContactController } from "../../controllers/v1/contact.controller";
import { ContactValidator } from "../../validations/v1/contact.validation";

const router = Router();

const contactController = container.resolve(ContactController);
const contactValidator = container.resolve(ContactValidator);

router.post("/createContact", contactValidator.createContactValidator, contactController.createContactController);

export default router;
