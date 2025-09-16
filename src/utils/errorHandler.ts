import { Request, Response, NextFunction } from 'express';
import { sendResponse } from './response';

export function handleControllerError(
    error: unknown,
    res: Response,
) {
    const err = error instanceof Error ? error : new Error('Unknown server error');

    res.locals.error = err;

    return sendResponse({
        res,
        status: 500,
        data: null,
        message: err?.message || 'Internal server error',
    })
}
