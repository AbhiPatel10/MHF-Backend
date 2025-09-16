import { NextFunction, Response } from "express";
import { inject, injectable } from "tsyringe";
import { sendResponse } from "../../utils/response";
import { UserRequest } from "../../types/types";
import { ProductsService } from "../../services/v1/products.service";
import { handleControllerError } from "../../utils/errorHandler";

@injectable()
export class ProductsController {
    constructor(
        @inject(ProductsService) private readonly products: ProductsService,
    ) { }

    createProductsController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.user?.userId ?? 0);
            const businessId = Number(req.user?.business?.businessId ?? 0);
            const { productName, description, price, images, gstPercentage, rateInclusive } = req.body;

            const { success, data, message } = await this.products.createProductsService({
                userId,
                productName,
                description,
                price,
                images,
                gstPercentage,
                rateInclusive,
                businessId
            });

            return sendResponse({ res, status: success ? 200 : 400, message, data });
        } catch (error) {
            console.error("----- createProductsController Error:", error);
            handleControllerError(error, res);
        }
    };

    getAllProductsController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.user?.userId ?? 0);

            const { success, data, message } = await this.products.getAllProductsService({ userId });

            return sendResponse({ res, status: success ? 200 : 400, message, data });
        } catch (error) {
            console.error("----- getAllProductsController Error:", error);
            handleControllerError(error, res);
        }
    };

    getProductDetailsController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.user?.userId ?? 0);
            const productId = Number(req.params.productId ?? 0);

            const { success, data, message } = await this.products.getProductDetailsService({ userId, productId });

            return sendResponse({ res, status: success ? 200 : 400, message, data });
        } catch (error) {
            console.error("----- getProductDetailsController Error:", error);
            handleControllerError(error, res);
        }
    };

    updateProductsController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.user?.userId ?? 0);
            const productId = Number(req.params.productId);

            const { productName, description, price, images, gstPercentage, rateInclusive } = req.body;

            const { success, data, message } = await this.products.updateProductsService({
                productId,
                userId,
                productName,
                description,
                price,
                images,
                gstPercentage,
                rateInclusive,
            });

            return sendResponse({ res, status: success ? 200 : 400, message, data });
        } catch (error) {
            console.error("----- updateProductsController Error:", error);
            handleControllerError(error, res);
        }
    };

    deleteProductsController = async (req: UserRequest, res: Response, next: NextFunction) => {
        try {
            const userId = Number(req.user?.userId ?? 0);
            const productId = Number(req.params.productId);

            const { success, data, message } = await this.products.deleteProductsService({
                productId,
                userId,
            });

            return sendResponse({ res, status: success ? 200 : 400, message, data });
        } catch (error) {
            console.error("----- deleteProductsController Error:", error);
            handleControllerError(error, res);
        }
    };

}
