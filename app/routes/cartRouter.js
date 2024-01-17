import { Router } from 'express';
import cartControllers from '../controllers/cartControllers.js';

const router = Router();
const { getCart, addItem, removeitem } = cartControllers;

router.get('/', getCart);
router.post('/addItem', addItem);
router.delete('/removeItem', removeitem);

export default router;
