import { MessageService } from "../../utils/MessageService";
import { NewsletterModel } from "../../entities/newsletter.schema";
import { inject, injectable } from "tsyringe";

@injectable()
export class NewsletterService {
    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }
    async getAllNewslettersService({
        limit,
        offset,
        sortOrder
    }: {
        limit: number;
        offset: number;
        sortOrder: "asc" | "desc";
    }): Promise<{ success: boolean; message: string; data?: any }> {
        try {
            const [newsletters, total] = await Promise.all([
                NewsletterModel.find()
                    .sort({ createdAt: sortOrder === "asc" ? 1 : -1 })
                    .skip(offset)
                    .limit(limit),
                NewsletterModel.countDocuments(),
            ]);

            return {
                success: true,
                message: this.messageService.NEWSLETTER_FETCH_SUCCESS,
                data: {
                    newsletters,
                    total,
                },
            };
        } catch (error) {
            console.error("Error in getAllNewslettersService:", error);
            return { success: false, message: "Error fetching newsletters" };
        }
    }
}
