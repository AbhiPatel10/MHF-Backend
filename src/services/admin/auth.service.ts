import { inject, injectable } from "tsyringe";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AdminUserModel, AdminUserDocument } from "../../entities/admin/admin.schema";
import { MessageService } from "../../utils/MessageService";
import { AdminLoginResponse } from "../../types/admin/admin.types";
import dotenv from 'dotenv';
import { Types } from "mongoose";

dotenv.config();
@injectable()
export class AuthService {
    private readonly saltRounds = 10;
    private readonly jwtSecret = process.env.JWT_SECRET ?? "";

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    /**
     * Creates admin service
     * @param { name, email, password } 
     * @returns admin service 
     */
    async createAdminService({ name, email, password }: { name: string; email: string; password: string })
        : Promise<{
            success: boolean;
            message: string;
            data: {
                accessToken: string,
                adminUser: Partial<AdminUserDocument> | null
            } | null
        }> {
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

            const adminData = await this.getAdminDetailsService({ adminUserId: newAdmin._id ?? 0 });

            const jwtToken = jwt.sign(
                { admin: adminData.data },
                this.jwtSecret,
                { expiresIn: "24h" }
            );
            return {
                success: true,
                data: {
                    accessToken: jwtToken,
                    adminUser: adminData.data
                },
                message: this.messageService.ADMIN_ALREADY_CREATE_SUCCESS,
            };
        } catch (error) {
            console.log("Error in createAdminService:", error);
            return {
                success: false,
                message: this.messageService.ADMIN_ALREADY_CREATE_ERROR,
                data: null,
            };
        }
    }

    /**
     * Admins login service
     * @param { email, password } 
     * @returns login service 
     */
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

            const adminData = await this.getAdminDetailsService({ adminUserId: existAdmin._id ?? 0 });

            const jwtToken = jwt.sign(
                { admin: adminData.data },
                this.jwtSecret,
                { expiresIn: "24h" }
            );

            return {
                success: true,
                data: {
                    accessToken: jwtToken,
                    adminUser: adminData.data
                },
                message: this.messageService.ADMIN_LOGIN_SUCCESS,
            };
        } catch (error) {
            console.log('Error in adminLoginService:', error);
            return {
                success: false,
                message: this.messageService.ADMIN_LOGIN_ERROR,
                data: null,
            };
        }
    }

    /**
     * Get Admin Details Service
     * @param { adminUserId }
     * @returns admin details
     */
    async getAdminDetailsService({ adminUserId }: { adminUserId: Types.ObjectId }): Promise<{
        success: boolean;
        message: string;
        data: Partial<AdminUserDocument> | null;
    }> {
        try {
            const admin = await AdminUserModel.findOne({
                _id: adminUserId,
                isActive: true,
                isDelete: false,
            }).select("_id name email role");
            if (!admin) {
                return {
                    success: false,
                    message: this.messageService.ADMIN_NOT_FOUND,
                    data: null,
                };
            }

            return {
                success: true,
                message: this.messageService.ADMIN_FETCH_SUCCESS,
                data: admin,
            };
        } catch (error) {
            console.log("Error in getAdminDetailsService:", error);
            return {
                success: false,
                message: this.messageService.ADMIN_FETCH_ERROR,
                data: null,
            };
        }
    }
}
