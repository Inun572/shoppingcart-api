import {
  addProduct,
  getProductById,
  getProducts,
} from '../services/productServices.js';

const productControllers = {
  getProducts: async (req, res) => {
    try {
      const bookId = Number(req.params.id);

      if (bookId) {
        if (isNaN(bookId)) {
          return res.status(400).json({
            message: 'Invalid book id',
          });
        }
        const data = await getProductById(bookId);

        if (data.length === 0) {
          return res.status(404).json({
            message: 'Product not found',
          });
        }

        res.json({
          message: 'Success get product',
          data,
        });
      } else {
        const data = await getProducts();

        if (data.length === 0) {
          return res.status(404).json({
            message: 'Products is empty',
          });
        }
        res.json({
          message: 'Success get products',
          data,
        });
      }
    } catch (err) {
      res
        .status(500)
        .json({ message: 'Internal server error' });
    }
  },

  addProduct: async (req, res) => {
    try {
      const product = req.body;
      if (!product) {
        return res.status(400).json({
          message:
            'Fail add product. Please provide product data',
        });
      }

      if (typeof product !== 'object') {
        return res.status(422).json({
          message: 'Fail add product. Invalid data type',
        });
      }

      if (
        !product.name ||
        !product.category ||
        !product.price
      ) {
        return res.status(400).json({
          message:
            'Fail add product. Please provide product data properly',
        });
      }
      const data = await addProduct(product);

      res.json({
        message: 'Success add product',
        data,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
        error: err,
      });
    }
  },
};

export default productControllers;
