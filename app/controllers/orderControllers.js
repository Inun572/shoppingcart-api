import {
  emptyCart,
  getCart,
} from '../services/cartServices.js';
import {
  createOrder,
  getOrderById,
  getOrders,
} from '../services/orderServices.js';

const orderControllers = {
  getOrders: async (req, res) => {
    try {
      const orderId = Number(req.params.id);

      if (orderId) {
        if (isNaN(orderId)) {
          return res.status(400).json({
            message: 'Invalid order id',
          });
        }

        const data = await getOrderById(orderId);

        if (!data) {
          return res.status(404).json({
            message: 'Order not found',
          });
        }

        res.json({
          message: 'Success get order',
          data,
        });
      } else {
        const data = await getOrders();

        if (data.length === 0) {
          return res.status(404).json({
            message: 'Orders is empty',
          });
        }

        res.json({
          message: 'Success get orders',
          data,
        });
      }
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
        error: err.message,
      });
    }
  },
  createOrder: async (req, res) => {
    try {
      const cartItem = await getCart();
      const orderDate = new Date();

      const orderNumber = 'ORD-' + Date.now();
      const total = cartItem.reduce((total, item) => {
        return total + item.total;
      }, 0);
      const data = await createOrder(
        orderDate,
        orderNumber,
        total
      );

      if (data.affectedRows !== 0) {
        await emptyCart();
      }

      res.json({
        message: 'Success create order',
        data,
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
        error: err.message,
      });
    }
  },
};

export default orderControllers;
