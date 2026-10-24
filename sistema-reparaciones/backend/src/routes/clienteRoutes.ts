import { Router } from 'express';
import { crearCliente, obtenerClientes } from '../controllers/clienteController.js';
import { validate } from '../middlewares/validate.js';
import { crearClienteSchema } from '../schemas/clienteSchema.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

// Protegemos todas las rutas de clientes con verificarToken
router.post('/', verificarToken, validate(crearClienteSchema), crearCliente);
router.get('/', verificarToken, obtenerClientes);

export default router;