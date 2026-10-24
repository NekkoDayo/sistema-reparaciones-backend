// src/schemas/authSchema.ts
import { z } from 'zod';

export const registroSchema = z.object({
    body: z.object({
        nombre: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
        correo: z.string().email('El formato del correo no es válido'),
        password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
    }),
});

export const loginSchema = z.object({
    body: z.object({
        correo: z.string().email('El formato del correo no es válido'),
        password: z.string().min(1, 'La contraseña es obligatoria'),
    }),
});