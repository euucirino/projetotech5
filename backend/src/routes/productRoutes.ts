import express from 'express'
import {
  getAll,
  getProductById,
  createProduct,
  updateProduct,
  destroyProductById
} from '../controllers/productController'
import { authMiddleware } from '../middleware/authMiddleware'

const router = express.Router()

// Rota pública
router.post('/products', createProduct)

// Rotas privadas
router.get('/products', authMiddleware, getAll)
router.get('/products/:id', authMiddleware, getProductById)
router.put('/products/:id', authMiddleware, updateProduct)
router.delete('/products/:id', authMiddleware, destroyProductById)

export default router;
