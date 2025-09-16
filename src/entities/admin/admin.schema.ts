import mongoose, { model } from 'mongoose';

export interface AdminUserDocument extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    isActive: boolean;
    isDelete: boolean;
}

const AdminUserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, default: 'admin' },
        isActive: { type: Boolean, default: true },
        isDelete: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const AdminUserModel = model('Admin', AdminUserSchema);
