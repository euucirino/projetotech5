import express from 'express';
import {
  getAll,
  getUserById,
  createUser,
  updateUser,
  destroyUserById
} from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validarCadastro } from '../middleware/validarCadastro';

const router = express.Router();

// Rota pública com validações
router.post('/users', validarCadastro, createUser);

// Rotas privadas
router.get('/users', authMiddleware, getAll);
router.get('/users/:id', authMiddleware, getUserById)
router.put('/users/:id', authMiddleware, validarCadastro, updateUser);
router.delete('/users/:id', authMiddleware, destroyUserById);

export default router;
