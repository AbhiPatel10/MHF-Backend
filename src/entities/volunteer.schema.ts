import mongoose, { Document, model } from 'mongoose';

export interface VolunteerDocument extends Document {
    name: string;
    address: {
        city: string;
        state: string;
        postalCode: string;
    };
    bloodGroup: string;
    birthdate: Date;
    occupation: string;
    skills: string[];
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
        occupation: { type: String, required: true },
        skills: { type: [String], required: true }, // Array of skills
        isActive: { type: Boolean, default: true },
        isDelete: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const VolunteerModel = model<VolunteerDocument>('Volunteer', VolunteerSchema);
