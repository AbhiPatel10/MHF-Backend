import mongoose, { Document, model } from "mongoose";

export interface VolunteerApplicationDocument extends Document {
    fullName: string;
    email: string;
    phone: string;
    reason?: string;
    isActive: boolean;
    isDelete: boolean;
}

const VolunteerApplicationSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        reason: { type: String }, // optional field
        isActive: { type: Boolean, default: true },
        isDelete: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const VolunteerApplicationModel = model<VolunteerApplicationDocument>(
    "VolunteerApplication",
    VolunteerApplicationSchema
);
