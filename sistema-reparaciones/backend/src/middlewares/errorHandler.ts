// src/middlewares/errorHandler.ts
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError.js';

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Si es un error controlado creado por nosotros (AppError)
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            error: err.message,
        });
    }

    // Si ocurre un error desconocido de Prisma u otra cosa
    console.error('ERROR NO CONTROLADO 🛑:', err);

    return res.status(500).json({
        error: 'Error interno del servidor.',
    });
};