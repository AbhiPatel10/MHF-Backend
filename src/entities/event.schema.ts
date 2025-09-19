import mongoose, { model, Document } from 'mongoose';
import { ImageDocument } from './admin/adminImages.entity';

export interface EventDocument extends Document {
    name: string;
    category: string;
    date: Date;
    location: string;
    image?: mongoose.Types.ObjectId | ImageDocument;
    description?: any; // Editor.js JSON
    isActive: boolean;
    isDelete: boolean;
}

const EventSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, required: true },
        date: { type: Date, required: true },
        location: { type: String, required: true },
        image: { type: mongoose.Schema.Types.ObjectId, ref: 'Image' },
        description: { type: mongoose.Schema.Types.Mixed }, // Store JSON from Editor.js
        isActive: { type: Boolean, default: true },
        isDelete: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const EventModel = model<EventDocument>('Event', EventSchema);
