import { Router } from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';

const router = Router();

router.use('/products', productRouter);
router.use('/shopping-cart', cartRouter);

export default router;
