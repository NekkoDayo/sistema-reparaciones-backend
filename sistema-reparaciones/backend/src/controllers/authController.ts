// src/controllers/authController.ts

import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma.js';

const JWT_SECRET: string = (process.env.JWT_SECRET as string) || 'clave_secreta_super_segura_temporal';
export const registrarUsuario = async (req: Request, res: Response) => {
    try {
        const { nombre, correo, password } = req.body;

        // Verificar si el usuario ya existe
        const existeUsuario = await prisma.usuario.findUnique({ where: { correo } });
        if (existeUsuario) {
            return res.status(400).json({ error: 'El correo ya está registrado.' });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear usuario en base de datos
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                nombre,
                correo,
                password: hashedPassword,
            },
        });

        res.status(201).json({
            mensaje: '¡Usuario registrado con éxito!',
            usuario: { id: nuevoUsuario.id, nombre: nuevoUsuario.nombre, correo: nuevoUsuario.correo },
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario.', detalle: error });
    }
};

export const loginUsuario = async (req: Request, res: Response) => {
    try {
        const { correo, password } = req.body;

        // Buscar usuario
        const usuario = await prisma.usuario.findUnique({ where: { correo } });
        if (!usuario) {
            return res.status(400).json({ error: 'Credenciales inválidas.' });
        }

        // Verificar contraseña
        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(400).json({ error: 'Credenciales inválidas.' });
        }

        // Generar Token JWT (expira en 2 horas)
        const token = jwt.sign(
            { userId: usuario.id, correo: usuario.correo },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.json({
            mensaje: '¡Login exitoso!',
            token,
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión.', detalle: error });
    }
};