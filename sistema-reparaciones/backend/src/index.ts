// src/index.ts
import express, { Request, Response } from 'express';
import clienteRoutes from './routes/clienteRoutes.js';
import equipoRoutes from './routes/equipoRoutes.js';

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

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});