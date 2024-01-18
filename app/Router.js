import { Router } from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';

const router = Router();

router.use('/products', productRouter);
router.use('/shopping-cart', cartRouter);
router.use('/orders', orderRouter);

export default router;
