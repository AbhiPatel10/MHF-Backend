import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "tsyringe";
import { sendResponse } from "../../utils/response";
import { AdminRequest, UserRequest } from "../../types/types";
import { AuthService } from "../../services/v1/auth.service";
import { handleControllerError } from "../../utils/errorHandler";
import { UserService } from "../../services/v1/user.service";

@injectable()
export class UserController {
    constructor(
        @inject(UserService) private readonly userService: UserService,

    ) { }

    getUserDetailsController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {

            const userId = Number(req.user?.userId ?? 0);

            const { success, data, message } = await this.userService.getUserDetailsService({ userId });

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

    updateUserController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.user?.userId ?? 0);

            const { name, imageId } = req.body;

            const result = await this.userService.updateUserService({ name, imageId, userId });

            return sendResponse({
                res,
                status: result.success ? 200 : 400,
                message: result.message,
                data: result.data
            });
        } catch (error) {
            console.error("----- updateUser Error:", error);
            handleControllerError(error, res);
        }
    };
}