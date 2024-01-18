import Cart from '../models/cartModel.js';
import Products from '../models/productsModel.js';
import { recalculateTotals } from '../services/cartServices.js';

const cartControllers = {
  getCart: (req, res) => {
    res.json({
      message: 'Getting items cart successfully',
      data: Cart,
    });
  },
  addItem: (req, res) => {
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    if (!productId || !quantity) {
      return res.status(400).json({
        message: 'Fail add to cart. Please provide productId and quantity',
      });
    }

    if (typeof productId !== 'number' || typeof quantity !== 'number') {
      return res.status(422).json({
        message: 'Fail add to cart. Invalid data type',
      });
    }

    const product = Products.find((product) => product.id === productId);

    if (!product) {
      return res.status(404).json({
        message: 'Fail add to cart. Product not found',
      });
    }

    if (!product.inStock) {
      return res.status(400).json({
        message: 'Fail add to cart. Item out of stock',
      });
    }

    const indexItemInCart = Cart.items.findIndex(
      (item) => item.product.id === productId
    );
    if (indexItemInCart !== -1) {
      Cart.items[indexItemInCart].quantity += quantity;
      recalculateTotals(Cart);

      return res.json({
        message: 'Success update quantity to cart',
        data: {
          product,
          quantity: Cart.items[indexItemInCart].quantity,
        },
      });
    }

    Cart.items.push({ product, quantity });
    recalculateTotals(Cart);
    res.json({
      message: 'Success add to cart',
      data: {
        product,
        quantity,
      },
    });
  },

  removeitem: (req, res) => {
    try {
      const productId = req.body.productId;

      if (typeof productId !== 'number') {
        return res.status(422).json({
          message: 'Fail add to cart. Cannot process the data',
        });
      }

      const productIndex = Cart.items.findIndex(
        (product) => product.product.id === productId
      );

      if (productIndex === -1) {
        return res.status(404).json({
          message: 'Fail remove from cart. Product not found',
        });
      }

      Cart.items.splice(productIndex, 1);
      recalculateTotals(Cart);

      res.json({
        message: `Success remove item from the cart`,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error.message });
    }
  },
};

export default cartControllers;
