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

const router = Router();

router.post('/', validate(crearEquipoSchema), crearEquipo);
router.get('/', obtenerEquipos);
router.get('/:id', obtenerEquipoPorId);
router.patch('/:id', validate(actualizarEquipoSchema), actualizarEquipo);
router.delete('/:id', eliminarEquipo);

export default router;