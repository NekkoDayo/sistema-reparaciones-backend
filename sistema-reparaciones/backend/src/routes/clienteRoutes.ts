import { Router } from 'express';
import { crearCliente, obtenerClientes } from '../controllers/clienteController.js';
import { validate } from '../middlewares/validate.js';
import { crearClienteSchema } from '../schemas/clienteSchema.js';

const router = Router();

router.post('/', validate(crearClienteSchema), crearCliente);
router.get('/', obtenerClientes);

export default router;