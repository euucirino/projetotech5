import express from 'express';
import {
  getAll,
  getById,
  create,
  update,
  destroyById
} from '../controllers/commentController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/comments', create);
router.get('/comments', authMiddleware, getAll);
router.get('/comments/:id', authMiddleware, getById);
router.put('/comments/:id', authMiddleware, update);
router.delete('/comments/:id', authMiddleware, destroyById);

export default router;
