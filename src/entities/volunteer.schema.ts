import mongoose, { Document, model } from 'mongoose';
import { ImageDocument } from './admin/adminImages.entity';

export interface VolunteerDocument extends Document {
    name: string;
    address: {
        city: string;
        state: string;
        postalCode: string;
    };
    bloodGroup: string;
    birthdate: Date;
    phoneNo: string;
    occupation: string;
    skills: string[];
    image?: mongoose.Types.ObjectId | ImageDocument;
    isActive: boolean;
    isDelete: boolean;
}

const VolunteerSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: {
            city: { type: String, required: true },
            state: { type: String, required: true },
            postalCode: { type: String, required: true },
        },
        bloodGroup: { type: String, required: true },
        birthdate: { type: Date, required: true },
        phoneNo: { type: String, required: true },
        occupation: { type: String, required: true },
        skills: { type: [String], required: true },
        image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
        isActive: { type: Boolean, default: true },
        isDelete: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const VolunteerModel = model<VolunteerDocument>('Volunteer', VolunteerSchema);
