import { Router } from 'express';
// import { getProducts } from '../services/productServices.js';
import productControllers from '../controllers/productControllers.js';

const router = Router();

const { getProducts, addProduct } = productControllers;

router.get('/', getProducts);
router.get('/:id', getProducts);
router.post('/', addProduct);

export default router;
