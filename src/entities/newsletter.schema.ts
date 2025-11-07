import mongoose, { Document, model } from "mongoose";

export interface NewsletterDocument extends Document {
    email: string;
    isSubscribed: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const NewsletterSchema = new mongoose.Schema<NewsletterDocument>(
    {
        email: { type: String, required: true, unique: true },
        isSubscribed: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export const NewsletterModel = model<NewsletterDocument>('Newsletter', NewsletterSchema);
