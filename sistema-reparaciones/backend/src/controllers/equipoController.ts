// src/controllers/equipoController.ts
import { Request, Response } from 'express';
import prisma from '../prisma.js';

export const crearEquipo = async (req: Request, res: Response) => {
    try {
        const { tipoEquipo, marca, modelo, falla, clienteId } = req.body;
        const nuevoEquipo = await prisma.equipoReparacion.create({
            data: { tipoEquipo, marca, modelo, falla, clienteId },
            include: { cliente: true },
        });
        res.status(201).json({ mensaje: '¡Equipo registrado con éxito!', equipo: nuevoEquipo });
    } catch (error) {
        res.status(400).json({ error: 'No se pudo registrar el equipo.', detalle: error });
    }
};

export const obtenerEquipos = async (req: Request, res: Response) => {
    try {
        const equipos = await prisma.equipoReparacion.findMany({ include: { cliente: true } });
        res.json(equipos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener equipos.', detalle: error });
    }
};

export const obtenerEquipoPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const equipo = await prisma.equipoReparacion.findUnique({
            where: { id: Number(id) },
            include: { cliente: true },
        });
        if (!equipo) return res.status(404).json({ error: 'Equipo no encontrado.' });
        res.json(equipo);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el equipo.', detalle: error });
    }
};

export const actualizarEquipo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { estado, falla, marca, modelo } = req.body;
        const equipoActualizado = await prisma.equipoReparacion.update({
            where: { id: Number(id) },
            data: {
                ...(estado && { estado }),
                ...(falla && { falla }),
                ...(marca && { marca }),
                ...(modelo && { modelo }),
            },
            include: { cliente: true },
        });
        res.json({ mensaje: '¡Equipo actualizado con éxito!', equipo: equipoActualizado });
    } catch (error) {
        res.status(400).json({ error: 'No se pudo actualizar.', detalle: error });
    }
};

export const eliminarEquipo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.equipoReparacion.delete({ where: { id: Number(id) } });
        res.json({ mensaje: `¡El equipo con ID ${id} ha sido eliminado!` });
    } catch (error) {
        res.status(400).json({ error: 'No se pudo eliminar.', detalle: error });
    }
};