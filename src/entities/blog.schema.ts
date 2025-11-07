import mongoose, { model, Document } from 'mongoose';
import { ImageDocument } from './admin/adminImages.entity';
import { CategoryDocument } from './category.schema';
import { AdminUserDocument } from './admin/admin.schema';

export interface BlogDocument extends Document {
    title: string;
    category: mongoose.Types.ObjectId | CategoryDocument;
    image?: mongoose.Types.ObjectId | ImageDocument;
    author: string;
    authorImage?: mongoose.Types.ObjectId | ImageDocument;
    content: any;
    isDraft: boolean;
    isActive: boolean;
    isDelete: boolean;
    createdBy: mongoose.Types.ObjectId | AdminUserDocument;
    updatedBy: mongoose.Types.ObjectId | AdminUserDocument;
}

const BlogSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
        author: { type: String },
        authorImage: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
        content: { type: mongoose.Schema.Types.Mixed },
        isDraft: { type: Boolean, default: false },
        isActive: { type: Boolean, default: true },
        isDelete: { type: Boolean, default: false },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    },
    { timestamps: true }
);

export const BlogModel = model<BlogDocument>('Blog', BlogSchema);
