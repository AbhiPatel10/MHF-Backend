import { inject, injectable } from "tsyringe";
import { AppDataSource } from "../../config/database";
import { User } from "../../entities/user.entity";
import { MessageService } from "../../utils/MessageService";
import { BusinessReview } from "../../entities/businessesReview.entity";
import { Businesses } from "../../entities/businesses.entity";

@injectable()
export class BusinessReviewService {
    private readonly reviewRepo = AppDataSource.getRepository(BusinessReview);
    private readonly businessRepo = AppDataSource.getRepository(Businesses);
    private readonly userRepo = AppDataSource.getRepository(User);

    constructor(
        @inject(MessageService) private readonly messageService: MessageService
    ) { }

    async addReviewService({
        businessId, userId, rating, review
    }: {
        businessId: number; userId: number; rating: number; review?: string
    }): Promise<{ success: boolean; message: string; data: BusinessReview | null }> {

        try {

            const business = await this.businessRepo.findOne({
                where: {
                    businessId,
                    isDelete: false,
                    isActive: true
                },
                relations: ["reviews", "reviews.user"]
            });
            if (!business) {
                return {
                    success: false,
                    message: this.messageService.BUSINESS_NOT_FOUND,
                    data: null
                };
            }

            const user = await this.userRepo.findOne({
                where: {
                    userId,
                    isActive: true
                }
            });
            if (!user) {
                return {
                    success: false,
                    message: this.messageService.USER_NOT_EXIST,
                    data: null
                };
            }

            const existingReview = await this.reviewRepo.findOne({
                where: {
                    business: { businessId },
                    user: { userId }
                },
                relations: ["business", "user"]
            });

            if (existingReview) {
                return {
                    success: false,
                    message: this.messageService.REVIEW_ALREADY_EXISTS,
                    data: existingReview
                };
            }

            const reviewEntity = this.reviewRepo.create({
                business,
                user,
                rating,
                review
            });
            const reviewUpdate = await this.reviewRepo.save(reviewEntity);

            const totalReviews = (business.reviews?.length ?? 0) + 1;
            business.totalReviews = totalReviews;
            business.reviews = [...(business.reviews ?? []), reviewUpdate];
            const totalRatingSum = business.reviews?.reduce((sum, r) => sum + r.rating, 0) ?? 0 + rating;
            business.avgRating = totalRatingSum / totalReviews;

            await this.businessRepo.save(business);

            return {
                success: true,
                message: this.messageService.REVIEW_ADDED_SUCCESSFULLY,
                data: reviewEntity
            };
        } catch (error) {
            console.error('----- addReviewService Error:', error);
            return {
                success: false,
                message: this.messageService.REVIEW_ADDED_ERROR,
                data: null
            }
        }
    }

    async updateReviewService({ reviewId, userId, rating, review }: { reviewId: number, userId: number, rating: number, review?: string }) {
        try {

            const reviewExist = await this.reviewRepo.findOne({ where: { reviewId }, relations: ["user"] });
            if (!reviewExist) {
                return { success: false, message: this.messageService.REVIEW_NOT_FOUND, data: null };
            }

            if (reviewExist.user.userId !== userId) {
                return { success: false, message: this.messageService.UNAUTHORIZED_TO_UPDATE_REVIEW, data: null };
            }

            reviewExist.rating = rating;
            reviewExist.review = review;
            reviewExist.isEdited = true;

            await this.reviewRepo.save(reviewExist);

            // ✅ Recalculate business ratings
            const business = await this.businessRepo.findOne({
                where: {
                    businessId: reviewExist.business.businessId,
                    isDelete: false,
                    isActive: true
                },
                relations: ["reviews"]
            });

            if (!business) {
                return {
                    success: false,
                    message: this.messageService.BUSINESS_NOT_FOUND,
                    data: null
                };
            }

            const totalReviews = business.reviews?.length ?? 0;
            const totalRatingSum = business.reviews?.reduce((sum, r) => sum + r.rating, 0) ?? 0;

            business.totalReviews = totalReviews;
            business.avgRating = totalReviews > 0 ? totalRatingSum / totalReviews : 0;

            await this.businessRepo.save(business);

            return {
                success: true,
                message: this.messageService.REVIEW_UPDATE_SUCCESSFULLY,
                data: reviewExist
            };
        } catch (error) {
            console.error('----- updateReviewService Error:', error);
            return {
                success: false,
                message: this.messageService.REVIEW_UPDATE_ERROR,
                data: null
            };
        }
    }

    async getReviewsService({
        businessId, limit, offset
    }: {
        businessId: number, limit: number, offset: number
    }) {
        try {

            const query = this.reviewRepo
                .createQueryBuilder("review")
                .leftJoinAndSelect("review.user", "user")
                .where("review.businessId = :businessId", { businessId })
                .select([
                    "review.reviewId",
                    "review.rating",
                    "review.review",
                    "review.createdOn",
                    "user.userId",
                    "user.name"
                ])
                .orderBy("review.createdOn", "DESC")

            if (limit) {
                query.skip(offset)
                    .take(limit);
            }

            const [reviews, totalCount] = await query.getManyAndCount();

            return {
                success: true,
                message: this.messageService.GET_ALL_REVIEW_FETCH_SUCCESS,
                data: {
                    reviews,
                    totalCount
                }
            };
        } catch (error) {
            return {
                success: false,
                message: this.messageService.GET_ALL_REVIEW_FETCH_ERROR,
                data: null
            };
        }
    }
}
