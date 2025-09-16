import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { sendResponse } from "../../utils/response";
import { AdminRequest } from "../../types/types";
import { AuthService } from "../../services/v1/auth.service";
import { handleControllerError } from "../../utils/errorHandler";

@injectable()
export class AuthController {
    constructor(
        @inject(AuthService) private readonly authService: AuthService,

    ) { }

    createUserController = async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { name, phoneNo, password } = req.body;

            const { success, data, message } = await this.authService.createUserService({ name, phoneNo, password });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- createUserController Error:', error);
            handleControllerError(error, res);
        }
    };

    loginUserController = async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { phoneNo, password } = req.body;

            const { success, data, message } = await this.authService.loginUserService({ phoneNo, password });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- loginUserController Error:', error);
            handleControllerError(error, res);
        }
    };

    sendOTPController = async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { phoneNo } = req.body;

            const { success, data, message } = await this.authService.sendOTPService({ phoneNo });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- sendOTPController Error:', error);
            handleControllerError(error, res);
        }
    };

    forgotPasswordController = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { phoneNo, newPassword } = req.body;
            const { success, message } = await this.authService.forgotPasswordService({ phoneNo, newPassword });
            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data: null
            });
        } catch (error) {
            console.error('----- forgotPasswordController Error:', error);
            handleControllerError(error, res);
        }
    };
    verifyOTPController = async (req: AdminRequest, res: Response, next: NextFunction) => {
        try {
            const { phoneNo, OTP } = req.body;

            const { success, data, message } = await this.authService.verifyOTPService({ phoneNo, OTP });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- verifyOTPController Error:', error);
            handleControllerError(error, res);
        }
    };
}