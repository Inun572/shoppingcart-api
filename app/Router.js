import { Router } from 'express';
import productRouter from './routes/products.js';
import cartRouter from './routes/cart.js';

const router = Router();

router.use('/products', productRouter);
router.use('/shopping-cart', cartRouter);

export default router;
