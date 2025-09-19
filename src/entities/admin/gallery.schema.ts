import mongoose, { Schema } from 'mongoose';
import { ImageDocument } from './adminImages.entity';
import { AdminUserDocument } from './admin.schema';

export interface GalleryDocument extends Document {
  image: mongoose.Types.ObjectId | ImageDocument;
  altText: string;
  imageDescription: string;
  createdBy: mongoose.Types.ObjectId | AdminUserDocument;
}

const GallerySchema: Schema = new Schema<GalleryDocument>(
  {
    image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
    altText: { type: String },
    imageDescription: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
  },
  {
    timestamps: true,
  }
);

export const GalleryModel = mongoose.model<GalleryDocument>(
  'Gallery',
  GallerySchema
);
