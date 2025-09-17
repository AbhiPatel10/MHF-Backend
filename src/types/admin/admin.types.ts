import { AdminUserDocument } from "../../entities/admin/admin.schema";

export interface AdminLoginResponse {
    success: boolean;
    message: string;
    data: {
        adminUser: Partial<AdminUserDocument> | null,
        accessToken: string
    } | null;
}