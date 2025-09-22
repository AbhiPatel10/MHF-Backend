import { Router } from "express";
import { container } from "tsyringe";
import { ContactController } from "../../controllers/admin/contact.controller";
import { ContactValidator } from "../../validations/admin/contact.validation";

const router = Router();

const contactController = container.resolve(ContactController);
const contactValidator = container.resolve(ContactValidator);

router.get("/getAllContacts", contactValidator.getAllContactsValidator, contactController.getAllContactsController);
router.put("/updateStatus/:id", contactValidator.updateStatusValidator, contactValidator.paramsContactValidator, contactController.updateStatusController);
router.delete("/deleteContact/:id", contactValidator.paramsContactValidator, contactController.deleteContactController);

export default router;
