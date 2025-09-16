import { inject, injectable } from "tsyringe";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AppDataSource } from "../../config/database";
import { AdminUser } from "../../entities/admin/admin.entity";
import { MessageService } from "../../utils/MessageService";
import { AdminLoginResponse } from "../../types/admin/admin.types";

@injectable()
export class AuthService {
    private readonly adminRepository = AppDataSource.getRepository(AdminUser);
    private readonly saltRounds = 10;
    private readonly jwtSecret = process.env.JWT_SECRET ?? "";

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    async createAdminService({ email, password }: { email: string, password: string }): Promise<{ success: boolean, message: string, data: AdminUser | null }> {
        try {

            const existAdmin = await this.adminRepository.findOne({ where: { email: email } })
            if (existAdmin) {
                return {
                    success: false,
                    message: this.messageService.ADMIN_ALREADY_EXIST,
                    data: null
                }
            }
            const hashedPassword = await bcrypt.hash(password, this.saltRounds);
            const createAdmin = this.adminRepository.create({ email, password: hashedPassword });
            await this.adminRepository.save(createAdmin);

            return {
                success: true,
                data: {
                    email,
                },
                message: this.messageService.ADMIN_ALREADY_CREATE_SUCCESS
            }
        } catch (error) {
            return {
                success: false,
                message: this.messageService.ADMIN_ALREADY_CREATE_ERROR,
                data: null
            }
        }
    }

    async adminLoginService({ email, password }: { email: string, password: string }): Promise<AdminLoginResponse> {
        try {

            const existAdmin = await this.adminRepository.findOne({ where: { email: email } })
            if (!existAdmin) {
                return {
                    success: false,
                    message: this.messageService.INVALID_EMAIL_OR_PASSWORD,
                    data: null
                }
            }

            const isMatch = await bcrypt.compare(password, existAdmin.password ?? "");

            if (!isMatch) {
                return {
                    success: false,
                    message: this.messageService.INVALID_EMAIL_OR_PASSWORD,
                    data: null
                }
            }
            const jwtToken = jwt.sign({ adminUserId: existAdmin.adminUserId, email: existAdmin.email }, this.jwtSecret, { expiresIn: '1h' });

            return {
                success: true,
                data: {
                    email,
                    token: jwtToken
                },
                message: this.messageService.ADMIN_ALREADY_CREATE_SUCCESS
            }
        } catch (error) {
            return {
                success: false,
                message: this.messageService.ADMIN_ALREADY_CREATE_ERROR,
                data: null
            }
        }
    }

}
