import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AdminUserModel, AdminUserDocument } from "../../entities/admin/admin.schema";
import { MessageService } from "../../utils/MessageService";
import { AdminLoginResponse } from "../../types/admin/admin.types";
import dotenv from 'dotenv';

dotenv.config();
@injectable()
export class AuthService {
    private readonly saltRounds = 10;
    private readonly jwtSecret = process.env.JWT_SECRET ?? "";

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    // ✅ Create Admin
    async createAdminService({ name, email, password }: { name: string; email: string; password: string })
        : Promise<{ success: boolean; message: string; data: Partial<AdminUserDocument> | null }> {
        try {
            const existAdmin = await AdminUserModel.findOne({ email });
            if (existAdmin) {
                return {
                    success: false,
                    message: this.messageService.ADMIN_ALREADY_EXIST,
                    data: null,
                };
            }

            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            const newAdmin = await AdminUserModel.create({ name, email, password: hashedPassword });

            return {
                success: true,
                data: { email: newAdmin.email },
                message: this.messageService.ADMIN_ALREADY_CREATE_SUCCESS,
            };
        } catch (error) {
            console.log("error in createAdminService", error);
            return {
                success: false,
                message: this.messageService.ADMIN_ALREADY_CREATE_ERROR,
                data: null,
            };
        }
    }

    // ✅ Admin Login
    async adminLoginService({ email, password }: { email: string; password: string })
        : Promise<AdminLoginResponse> {
        try {
            const existAdmin = await AdminUserModel.findOne({ email });
            if (!existAdmin) {
                return {
                    success: false,
                    message: this.messageService.INVALID_EMAIL_OR_PASSWORD,
                    data: null,
                };
            }

            const isMatch = await bcrypt.compare(password, existAdmin.password);
            if (!isMatch) {
                return {
                    success: false,
                    message: this.messageService.INVALID_EMAIL_OR_PASSWORD,
                    data: null,
                };
            }
            console.log("this.jwtSecret-----", this.jwtSecret)
            const jwtToken = jwt.sign(
                { adminUserId: existAdmin._id, email: existAdmin.email },
                this.jwtSecret,
                { expiresIn: "1h" }
            );

            return {
                success: true,
                data: { email: existAdmin.email, token: jwtToken },
                message: this.messageService.ADMIN_LOGIN_SUCCESS,
            };
        } catch (error) {
            console.log('errrr', error);
            return {
                success: false,
                message: this.messageService.ADMIN_ALREADY_CREATE_ERROR,
                data: null,
            };
        }
    }
}
