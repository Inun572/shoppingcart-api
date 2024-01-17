import Products from '../models/productsModel.js';

const productControllers = {
  getProducts: (req, res) => {
    res.json({
      message: 'Get data products successfully',
      data: Products,
    });
  },

  getProductById: (req, res) => {
    const productId = Number(req.params.id);
    if (!productId) {
      return res.status(400).json({
        message: 'Bad request',
      });
    }

    const product = Products.find((product) => product.id === productId);

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
      });
    }

    res.json({
      message: `Success get product id: ${id}`,
      data: product,
    });
  },
};

export default productControllers;
