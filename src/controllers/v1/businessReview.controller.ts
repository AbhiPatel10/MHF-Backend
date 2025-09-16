import { Response, NextFunction } from "express";
import { inject, injectable } from "tsyringe";
import { BusinessReviewService } from "../../services/v1/businessReview.service";
import { sendResponse } from "../../utils/response";
import { handleControllerError } from "../../utils/errorHandler";
import { UserRequest } from "../../types/types";

@injectable()
export class BusinessReviewController {
    constructor(@inject(BusinessReviewService) private readonly reviewService: BusinessReviewService) { }

    /**
     * Add review controller of business review controller
     */
    addReviewController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const { businessId, rating, review } = req.body;
            const userId = req.user?.userId ?? 0;

            const result = await this.reviewService.addReviewService({ businessId, userId, rating, review });

            return sendResponse({ res, status: result.success ? 200 : 400, message: result.message, data: result.data });
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    updateReviewController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const { reviewId, rating, review } = req.body;
            const userId = req.user?.userId ?? 0;

            const result = await this.reviewService.updateReviewService({ reviewId, userId, rating, review });

            return sendResponse({
                res,
                status: result.success ? 200 : 400,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            handleControllerError(error, res);
        }
    };

    getAllReviewsController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const businessId = Number(req.params.businessId);

            const { limit, offset } = req.query as {
                limit?: string;
                offset?: string;
            }

            const limitValue = limit ? parseInt(limit, 10) : 0;
            const offsetValue = offset ? parseInt(offset, 10) : 0;

            const result = await this.reviewService.getReviewsService({
                businessId,
                limit: limitValue,
                offset: offsetValue
            });

            return sendResponse({
                res,
                status: 200,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            handleControllerError(error, res);
        }
    };
}
