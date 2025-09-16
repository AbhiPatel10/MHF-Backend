import { Response } from "express";

interface TResponse { res: Response, status: number, message: string, data: any }
export const sendResponse = ({ res, status, message, data = null }: TResponse) => {
    return res.status(status).json({
        status,
        message,
        data,
    });
};
