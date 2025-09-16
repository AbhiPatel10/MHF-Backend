import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET);

        const decodedData = JSON.parse(JSON.stringify(decoded));

        if (decodedData?.userId) {
            (req as any).user = decoded;
        } else {
            (req as any).adminUser = decoded;
        }

        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}



export function adminAuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET);

        const decodedData = JSON.parse(JSON.stringify(decoded));
        if (decodedData?.userId) {
            (req as any).user = decoded;
        } else {
            (req as any).adminUser = decoded;
        }

        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
}
