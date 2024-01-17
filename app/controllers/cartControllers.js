import Cart from '../models/cartModel.js';
import Products from '../models/productsModel.js';

const cartControllers = {
  getCart: (req, res) => {
    res.json({
      message: 'Getting items cart successfully',
      data: Cart,
    });
  },
  addItem: (req, res) => {
    const productId = req.body.productId;

    if (typeof productId !== 'number') {
      return res.status(422).json({
        message: 'Fail add to cart. Cannot process the data',
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

    Cart.items.push(product);
    Cart.totalItems = Cart.items.length;
    Cart.totalAmount = Cart.totalAmount + product.price;
    res.json({
      message: 'Success add to cart',
      data: product,
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
        (product) => product.id === productId
      );

      if (productIndex === -1) {
        return res.status(404).json({
          message: 'Fail remove from cart. Product not found',
        });
      }

      Cart.totalAmount = Cart.totalAmount - Cart.items[productIndex].price;
      Cart.items.splice(productIndex, 1);
      Cart.totalItems = Cart.items.length;
      res.json({
        message: `Product ID: ${productId} removed from the cart`,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: 'Internal server error', error: error.message });
    }
  },
};

export default cartControllers;
