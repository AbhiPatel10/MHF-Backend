import { NextFunction, Request, Response } from "express";
import { AuthService } from "../../services/admin/auth.service";
import { inject, injectable } from "tsyringe";
import { sendResponse } from "../../utils/response";

@injectable()
export class AuthController {
    constructor(
        @inject(AuthService) private readonly authService: AuthService,
    ) { }

    createAdminUserController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body;
            const { success, data, message } = await this.authService.createAdminService({ name, email, password });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- createAdminUserController Error:', error)
        }
    };

    adminLoginController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const { success, data, message } = await this.authService.adminLoginService({ email, password });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- createAdminUserController Error:', error)
        }
    };
}