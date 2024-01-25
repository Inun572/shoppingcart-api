import {
  addItem,
  deleteItem,
  emptyCart,
  getCart,
  getItemInCart,
  recalculateTotals,
  updateItem,
} from '../services/cartServices.js';
import { getProductById } from '../services/productServices.js';

const cartControllers = {
  getCart: async (req, res) => {
    try {
      const data = await getCart();
      if (data.length === 0) {
        return res.json({
          message: 'Cart is empty',
        });
      }

      let cartTotal = 0;
      data.forEach((item) => {
        cartTotal = cartTotal + item.total;
      });

      res.json({
        message: 'Success get cart',
        data: {
          items: data,
          cart_total: Number(cartTotal.toFixed(2)),
        },
      });
    } catch (err) {
      res.json({
        message: 'Internal server error',
        error: err.message,
      });
    }
  },
  addItem: async (req, res) => {
    try {
      const { productId, quantity } = req.body;

      if (!productId || !quantity) {
        return res.status(400).json({
          message: 'Please provide product id and quantity',
        });
      }

      if (
        typeof productId !== 'number' ||
        typeof quantity !== 'number'
      ) {
        return res.status(400).json({
          message: 'Invalid product id and quantity',
        });
      }

      const isExist = await getProductById(productId);

      if (!isExist) {
        return res.status(404).json({
          message: 'Product not found',
        });
      }

      if (isExist.in_stock === 0) {
        return res.status(400).json({
          message: 'Product is out of stock',
        });
      }

      const isInCart = await getItemInCart(productId);

      if (isInCart) {
        const newQuantity = isInCart.quantity + quantity;
        const data = await updateItem(
          isInCart,
          newQuantity
        );

        return res.json({
          message: 'Success update item in cart',
          data,
        });
      } else {
        const data = await addItem(isExist, quantity);

        res.json({
          message: 'Success add item in cart',
          data,
        });
      }
    } catch (err) {
      return res.status(500).json({
        message: 'Internal server error',
        error: err.message,
      });
    }
  },
  removeItem: async (req, res) => {
    try {
      const productId = Number(req.params.id);

      if (!productId) {
        return res.status(400).json({
          message: 'Please provide product id',
        });
      }

      if (isNaN(productId)) {
        return res.status(400).json({
          message: 'Invalid product id',
        });
      }

      const isExist = await getItemInCart(productId);

      if (!isExist) {
        return res.status(404).json({
          message: 'Item not found in cart',
        });
      }

      const data = await deleteItem(productId);

      res.json({
        message: 'Success remove item from cart',
        data,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
        error: err.message,
      });
    }
  },
  emptyCart: async (req, res) => {
    try {
      await emptyCart();
      res.json({
        message: 'Success empty cart',
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
        error: err.message,
      });
    }
  },
};

export default cartControllers;
