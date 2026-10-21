// src/controllers/clienteController.ts
import { Request, Response } from 'express';
import prisma from '../prisma.js';

export const crearCliente = async (req: Request, res: Response) => {
    try {
        const { nombre, telefono, correo } = req.body;
        const nuevoCliente = await prisma.cliente.create({
            data: { nombre, telefono, correo },
        });
        res.status(201).json({ mensaje: '¡Cliente creado con éxito!', cliente: nuevoCliente });
    } catch (error) {
        res.status(400).json({ error: 'No se pudo crear el cliente.', detalle: error });
    }
};

export const obtenerClientes = async (req: Request, res: Response) => {
    try {
        const clientes = await prisma.cliente.findMany({
            include: { equipos: true },
        });
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener clientes.', detalle: error });
    }
};