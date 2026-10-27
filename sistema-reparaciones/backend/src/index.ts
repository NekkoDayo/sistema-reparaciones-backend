// src/index.ts
import express, { Request, Response } from 'express';
import clienteRoutes from './routes/clienteRoutes.js';
import equipoRoutes from './routes/equipoRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = 3000;

// Middleware global
app.use(express.json());

// Ruta de prueba
app.get('/', (req: Request, res: Response) => {
    res.json({ mensaje: '¡El backend del sistema de reparaciones está funcionando bajo arquitectura limpia!' });
});

// Registro de Rutas
app.use('/clientes', clienteRoutes);
app.use('/equipos', equipoRoutes);

import authRoutes from './routes/authRoutes.js';

// ... (en tus app.use)
app.use('/auth', authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);

    // ... (aquí defines tus rutas: app.use('/clientes', clienteRoutes), etc.)

    // REGISTRAR EL MANEJADOR DE ERRORES AL FINAL DE TODO
    app.use(errorHandler);
});