import { Router } from "express";
import { container } from "tsyringe";
import { BusinessReviewController } from "../../controllers/v1/businessReview.controller";
import { BusinessReviewValidator } from "../../validations/v1/businessReview.validation";

const router = Router();
const reviewController = container.resolve(BusinessReviewController);
const reviewValidator = container.resolve(BusinessReviewValidator);

router.post("/addReview", reviewValidator.addReviewValidator, reviewController.addReviewController);
router.put("/updateReview", reviewValidator.updateReviewValidator, reviewController.updateReviewController);
router.get("/:businessId/getAllReviews", reviewValidator.getAllReviewsValidator, reviewController.getAllReviewsController);

export default router;
