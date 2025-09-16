import { AdminUser } from "../../entities/admin/admin.entity";

export interface AdminLoginResponse {
    success: boolean;
    message: string;
    data: (Partial<AdminUser> & { token: string }) | null;
}