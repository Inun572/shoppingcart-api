import { Router } from 'express';
import orderControllers from '../controllers/orderControllers.js';

const router = Router();
const {
  getOrders,
  createOrder,
  checkoutOrder,
  cancelOrder,
} = orderControllers;

router.get('/', getOrders);
router.get('/:id', getOrders);
router.post('/', createOrder);

export default router;
