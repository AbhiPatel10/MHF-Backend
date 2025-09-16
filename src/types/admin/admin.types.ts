import { AdminUser } from "../../entities/admin/admin.schema";

export interface AdminLoginResponse {
    success: boolean;
    message: string;
    data: (Partial<AdminUser> & { token: string }) | null;
}