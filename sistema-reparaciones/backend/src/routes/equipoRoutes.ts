import { Router } from 'express';
import {
    crearEquipo,
    obtenerEquipos,
    obtenerEquipoPorId,
    actualizarEquipo,
    eliminarEquipo
} from '../controllers/equipoController.js';
import { validate } from '../middlewares/validate.js';
import { crearEquipoSchema, actualizarEquipoSchema } from '../schemas/equipoSchema.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.post('/', verificarToken, validate(crearEquipoSchema), crearEquipo);
router.get('/', verificarToken, obtenerEquipos);
router.get('/:id', verificarToken, obtenerEquipoPorId);
router.patch('/:id', verificarToken, validate(actualizarEquipoSchema), actualizarEquipo);
router.delete('/:id', verificarToken, eliminarEquipo);

export default router;