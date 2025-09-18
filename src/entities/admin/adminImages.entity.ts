import mongoose, { Schema, Document } from "mongoose";

export interface ImageDocument extends Document {
    url: string;          // Path or cloud storage URL
    publicId?: string;    // Cloudinary or S3 ID
    altText?: string;     // Optional alt text for accessibility
    mimeType?: string;    // e.g. image/png, image/jpeg
    createdOn: Date;      // Auto timestamp
}

const ImageSchema: Schema = new Schema<ImageDocument>(
    {
        url: { type: String, required: true },
        publicId: { type: String },
        altText: { type: String },
        mimeType: { type: String },
        createdOn: { type: Date, default: Date.now },
    },
    {
        timestamps: true,
    }
);

export const ImageModel = mongoose.model<ImageDocument>("Image", ImageSchema);
