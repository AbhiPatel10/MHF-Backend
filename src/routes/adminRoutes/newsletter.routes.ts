import { Router } from "express";
import { NewsletterController } from "../../controllers/admin/newsletter.controller";
import { container } from "tsyringe";
import { NewsLetterValidator } from "../../validations/admin/newsLetter.validator";

const router = Router();

const newsLetterController = container.resolve(NewsletterController);
const newsLetterValidator = container.resolve(NewsLetterValidator);

router.get("/getAllNewsletters", newsLetterValidator.getAllNewsLetterValidator, newsLetterController.getAllNewslettersController);

export default router;
