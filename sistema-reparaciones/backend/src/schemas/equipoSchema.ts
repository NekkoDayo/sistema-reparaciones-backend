// src/schemas/equipoSchema.ts
import { z } from 'zod';

export const crearEquipoSchema = z.object({
    body: z.object({
        tipoEquipo: z.string().min(2, 'El tipo de equipo es obligatorio'),
        marca: z.string().min(1, 'La marca es obligatoria'),
        modelo: z.string().min(1, 'El modelo es obligatorio'),
        falla: z.string().min(5, 'La descripción de la falla debe tener al menos 5 caracteres'),
        clienteId: z.number(),
    }),
});

export const actualizarEquipoSchema = z.object({
    body: z.object({
        estado: z.enum(['PENDIENTE', 'EN_PROCESO', 'REPARADO', 'ENTREGADO']).optional(),
        falla: z.string().min(5).optional(),
        marca: z.string().optional(),
        modelo: z.string().optional(),
    }),
});