import { NextFunction, Response } from "express";
import { inject, injectable } from "tsyringe";
import { sendResponse } from "../../utils/response";
import { UserRequest } from "../../types/types";
import { ServicesService } from "../../services/v1/services.service";
import { handleControllerError } from "../../utils/errorHandler";

@injectable()
export class ServicesController {
    constructor(
        @inject(ServicesService) private readonly services: ServicesService,

    ) { }

    createServicesController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const businessId = Number(req.user?.business.businessId ?? 0);
            const userId = Number(req.user?.userId ?? 0);
            const { serviceName, description, price, images, gstPercentage, rateInclusive } = req.body;

            const { success, data, message } = await this.services.createServices({
                userId,
                businessId,
                serviceName,
                description,
                price,
                images,
                gstPercentage,
                rateInclusive
            });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- createServicesController Error:', error);
            handleControllerError(error, res);
        }
    };

    updateServicesController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const businessId = Number(req.user?.business.businessId ?? 0);
            const userId = Number(req.user?.userId ?? 0);
            const serviceId = Number(req.params.serviceId);

            const { serviceName, description, price, images, gstPercentage, rateInclusive } = req.body;

            const { success, data, message } = await this.services.updateServices({
                serviceId,
                userId,
                businessId,
                serviceName,
                description,
                price,
                images,
                gstPercentage,
                rateInclusive
            });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- updateServicesController Error:', error);
            handleControllerError(error, res);
        }
    };

    getAllServicesController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const businessId = Number(req.user?.business.businessId ?? 0);
            const userId = Number(req.user?.userId ?? 0);

            const { success, data, message } = await this.services.getAllServices({ userId, businessId });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- getAllServicesController Error:', error);
            handleControllerError(error, res);
        }
    };

    getServiceDetailsController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const businessId = Number(req.user?.business.businessId ?? 0);
            const userId = Number(req.user?.userId ?? 0);
            const serviceId = Number(req.params.serviceId ?? 0)

            const { success, data, message } = await this.services.getServicesDetails({ userId, businessId, serviceId });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message: message,
                data: data
            })
        } catch (error) {
            console.error('----- getAllServicesController Error:', error);
            handleControllerError(error, res);
        }
    };

    deleteServicesController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const businessId = Number(req.user?.business.businessId ?? 0);
            const userId = Number(req.user?.userId ?? 0);
            const serviceId = Number(req.params.serviceId);

            const { success, data, message } = await this.services.deleteServices({
                serviceId,
                userId,
                businessId
            });

            return sendResponse({
                res,
                status: success ? 200 : 400,
                message,
                data
            });
        } catch (error) {
            console.error("----- deleteServicesController Error:", error);
            handleControllerError(error, res);
        }
    };

}