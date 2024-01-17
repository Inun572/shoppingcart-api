import { Router } from 'express';
import orderControllers from '../controllers/orderControllers.js';

const router = Router();
const { getOrdersHistory, createOrder, checkoutOrder, cancelOrder } =
  orderControllers;

router.get('/', getOrdersHistory);
router.post('/create', createOrder);
router.post('/checkout', checkoutOrder);
router.delete('/delete', cancelOrder);

export default router;
