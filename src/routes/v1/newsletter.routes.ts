import { Router } from "express";
import { NewsletterController } from "../../controllers/v1/newsletter.controller";

const router = Router();
const newsletterController = new NewsletterController();

router.post("/subscribe", newsletterController.subscribeController);

export default router;
