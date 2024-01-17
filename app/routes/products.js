import { Router } from 'express';
import productControllers from '../controllers/productControllers.js';

const router = Router();
const { getProducts, getProductById } = productControllers;

router.get('/', getProducts);
router.get('/:id', getProductById);

export default router;
