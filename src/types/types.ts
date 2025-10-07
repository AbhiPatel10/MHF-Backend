import { Request } from "express";
import { AdminUserDocument } from "../entities/admin/admin.schema";

export interface AdminRequest extends Request {
    adminUser?: {
        admin: AdminUserDocument
    },
}

export interface UserRequest extends Request {
    user?: {
        userId: number,
        phoneNo: string,
        business: {
            businessId: number
        }
    },
}