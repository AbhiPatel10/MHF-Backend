import mongoose, { Document, model } from "mongoose";
import { VolunteerApplicationStatus } from "../types/admin/volunteerApplication.types";

export interface VolunteerApplicationDocument extends Document {
    fullName: string;
    email: string;
    phone: string;
    whatsapp?: string;
    bloodGroup?: string;
    address: string;
    city: string;
    state: string;
    country: string;
    countryCode: string;
    reason?: string;
    status: VolunteerApplicationStatus;
    isActive: boolean;
    isDelete: boolean;
}

const VolunteerApplicationSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        whatsapp: { type: String, default: "" }, // optional
        bloodGroup: { type: String, default: "" }, // optional
        address: { type: String, required: true }, // required
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        countryCode: { type: String, required: true },
        reason: { type: String },
        status: {
            type: String,
            enum: Object.values(VolunteerApplicationStatus),
            default: VolunteerApplicationStatus.PENDING,
        },
        isActive: { type: Boolean, default: true },
        isDelete: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const VolunteerApplicationModel = model<VolunteerApplicationDocument>(
    "VolunteerApplication",
    VolunteerApplicationSchema
);
