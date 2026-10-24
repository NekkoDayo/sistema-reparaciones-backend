// src/routes/authRoutes.ts
import { Router } from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/authController.js';
import { validate } from '../middlewares/validate.js';
import { registroSchema, loginSchema } from '../schemas/authSchema.js';

const router = Router();

router.post('/register', validate(registroSchema), registrarUsuario);
router.post('/login', validate(loginSchema), loginUsuario);

export default router;