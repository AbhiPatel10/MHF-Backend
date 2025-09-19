import mongoose, { Document, model } from "mongoose";

export interface CategoryDocument extends Document {
    name: string;
    isActive: boolean;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CategorySchema = new mongoose.Schema<CategoryDocument>(
    {
        name: { type: String, required: true },
        isActive: { type: Boolean, default: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const CategoryModel = model<CategoryDocument>('Category', CategorySchema);
