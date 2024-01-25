import { Router } from 'express';
import cartControllers from '../controllers/cartControllers.js';

const router = Router();
const { getCart, addItem, removeItem, emptyCart } =
  cartControllers;

router.get('/', getCart);
router.post('/', addItem);
router.delete('/', emptyCart);
router.delete('/:id', removeItem);

export default router;
