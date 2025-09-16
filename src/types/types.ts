import { Request } from "express";

export interface AdminRequest extends Request {
    adminUser?: {
        adminUserId: number,
        email: string
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