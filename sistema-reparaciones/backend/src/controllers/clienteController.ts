// src/controllers/clienteController.ts
import { Request, Response, NextFunction } from 'express';
import prisma from '../prisma.js';
import { AppError } from '../utils/AppError.js';

// Obtener todos los clientes
export const obtenerClientes = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const clientes = await prisma.cliente.findMany({
            include: { equipos: true }, // Si quieres traer sus equipos asociados
        });
        return res.json(clientes);
    } catch (error) {
        return next(error); // El middleware global se encarga de atraparlo
    }
};

// Crear un cliente nuevo
export const crearCliente = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { nombre, telefono, correo } = req.body;

        // Validación opcional de negocio: verificar si el correo ya existe
        const clienteExistente = await prisma.cliente.findUnique({
            where: { correo },
        });

        if (clienteExistente) {
            throw new AppError('Ya existe un cliente registrado con este correo electrónico.', 400);
        }

        const nuevoCliente = await prisma.cliente.create({
            data: { nombre, telefono, correo },
        });

        return res.status(201).json({
            mensaje: '¡Cliente registrado con éxito!',
            cliente: nuevoCliente,
        });
    } catch (error) {
        return next(error); // Si es un AppError o un fallo de Prisma, pasa directo al middleware central
    }
};