// src/middlewares/validate.ts
import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.ZodTypeAny) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.parseAsync({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            return next();
        } catch (error) {
            if (error instanceof ZodError) {
                return res.status(400).json({
                    error: 'Error de validación de datos',
                    detalles: error.issues.map((e) => ({
                        campo: e.path.join('.').replace('body.', ''),
                        mensaje: e.message,
                    })),
                });
            }
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }
    };
};