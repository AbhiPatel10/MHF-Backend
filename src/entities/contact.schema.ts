import mongoose, { model, Document } from "mongoose";

export interface ContactDocument extends Document {
    name: string;
    email: string;
    phoneNo: string;
    subject: string;
    message: string;
    isContacted: boolean; // contacted or not
    isActive: boolean;
    isDelete: boolean;
}

const ContactSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phoneNo: { type: String, required: true },
        subject: { type: String, required: true },
        message: { type: String, required: true },
        isContacted: { type: Boolean, default: false }, // default: not contacted
        isActive: { type: Boolean, default: true },
        isDelete: { type: Boolean, default: false },
    },
    { timestamps: true } // createdAt, updatedAt auto-added
);

export const ContactModel = model<ContactDocument>("Contact", ContactSchema);
