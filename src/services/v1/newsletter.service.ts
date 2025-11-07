import { NewsletterModel } from "../../entities/newsletter.schema";

export class NewsletterService {
    async subscribeService({ email }: { email: string }) {
        try {
            if (!email) {
                return { success: false, message: "Email is required" };
            }

            const existing = await NewsletterModel.findOne({ email });
            if (existing) {
                return { success: true, message: "Already subscribed" };
            }

            await NewsletterModel.create({ email });
            return { success: true, message: "Subscribed successfully" };
        } catch (error) {
            console.error("Error in subscribeService:", error);
            return { success: false, message: "Error subscribing" };
        }
    }
}
