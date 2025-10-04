import mongoose, { Document, model } from 'mongoose';
import { ImageDocument } from './admin/adminImages.entity';
import { TeamMemberTypes } from '../types/admin/teamMembers.types';

export interface TeamMemberDocument extends Document {
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
    memberType: TeamMemberTypes.ASSET | TeamMemberTypes.KEY_MEMBER | TeamMemberTypes.VOLUNTEER;
    isActive: boolean;
    isDelete: boolean;
}

const TeamMemberSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        address: {
            city: { type: String, required: false },
            state: { type: String, required: false },
            postalCode: { type: String, required: false },
        },
        bloodGroup: { type: String, required: false },
        role: { type: String, required: false },
        birthdate: { type: Date, required: false },
        phoneNo: { type: String, required: false },
        occupation: { type: String, required: false },
        skills: { type: [String], required: false },
        image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
        memberType: {
            type: String,
            enum: [TeamMemberTypes.ASSET, TeamMemberTypes.KEY_MEMBER, TeamMemberTypes.VOLUNTEER], // enum values
            required: true,
            default: TeamMemberTypes.VOLUNTEER,
        },
        isActive: { type: Boolean, default: true },
        isDelete: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const TeamMemberModel = model<TeamMemberDocument>('TeamMember', TeamMemberSchema);
