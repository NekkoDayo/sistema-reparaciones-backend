// src/schemas/clienteSchema.ts
import { z } from 'zod';

export const crearClienteSchema = z.object({
  body: z.object({
    nombre: z.string().min(3, 'El nombre es obligatorio y debe tener al menos 3 caracteres'),
    telefono: z.string().min(8, 'El teléfono es obligatorio y debe tener al menos 8 dígitos'),
    correo: z.string().email('El formato del correo electrónico no es válido'),
  }),
});