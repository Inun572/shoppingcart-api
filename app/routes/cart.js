import { Router } from 'express';
import cartControllers from '../controllers/cartControllers.js';

const router = Router();
const { getCart, addItem } = cartControllers;

router.get('/', getCart);
router.post('/addItem', addItem);

export default router;
