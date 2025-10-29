import mongoose, { Document, model } from "mongoose";
import { VolunteerApplicationStatus } from "../types/admin/volunteerApplication.types";

export interface VolunteerApplicationDocument extends Document {
    fullName: string;
    email: string;
    phone: string;
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
        status: {
            type: String,
            enum: Object.values(VolunteerApplicationStatus),
            default: VolunteerApplicationStatus.PENDING,
        },
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
