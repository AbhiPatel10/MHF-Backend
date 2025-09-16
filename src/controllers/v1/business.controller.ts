import { NextFunction, Request, Response } from 'express';
import { BusinessService } from '../../services/v1/business.service';
import { UserRequest } from '../../types/types';
import { inject, injectable } from 'tsyringe';
import { sendResponse } from '../../utils/response';
import { handleControllerError } from '../../utils/errorHandler';


@injectable()
export class BusinessController {
    constructor(
        @inject(BusinessService) private readonly businessService: BusinessService,
    ) { }

    addBusinessDetailsController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.userId ?? 0;
            const { success, data, message } = await this.businessService.addBusinessDetailsService({ userId: userId, data: req.body });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            });
        } catch (error) {
            console.error('----- addBusinessDetailsController Error:', error);
            handleControllerError(error, res);
        }
    };

    getBusinessController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {

            const { data, message, success } = await this.businessService.getBusinessById({ userId: Number(req.params.userId) });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            });
        } catch (error) {
            console.error('----- getBusinessController Error:', error);
            handleControllerError(error, res);
        }
    };

    businessDetailsController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {

            const { data, message, success } = await this.businessService.getBusinessById({ businessId: Number(req.params.businessId ?? 0) });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            });
        } catch (error) {
            console.error('----- businessDetailsController Error:', error);
            handleControllerError(error, res);
        }
    };

    getAllBusinessController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {

            const { search, categoryId, subCategoryId, limit, offset } = req.query as {
                search?: string,
                categoryId: string,
                subCategoryId: string,
                limit?: string;
                offset?: string;
            }

            const limitValue = limit ? parseInt(limit, 10) : 0;
            const offsetValue = offset ? parseInt(offset, 10) : 0;

            const { data, message, success } = await this.businessService.getAllBusinessService({
                categoryId: Number(categoryId ?? 0),
                subCategoryId: Number(subCategoryId ?? 0),
                limit: limitValue,
                offset: offsetValue,
                search: search
            });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            });
        } catch (error) {
            console.error('----- getAllBusinessController Error:', error);
            handleControllerError(error, res);
        }
    };
}
