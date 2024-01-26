import {
  emptyCart,
  getCart,
} from '../services/cartServices.js';
import {
  createOrder,
  getOrderById,
  getOrderDetail,
  getOrders,
  insertOrderItem,
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

        const orderItems = await getOrderDetail(orderId);
        res.json({
          message: 'Success get order',
          data: {
            ...data,
            items: orderItems,
          },
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
      console.log(err);
      res.status(500).json({
        message: 'Internal server error',
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

      const orderItems = await insertOrderItem(
        data.insertId,
        cartItem
      );

      if (
        data.affectedRows !== 0 &&
        orderItems.affectedRows !== 0
      ) {
        await emptyCart();
      }

      res.json({
        message: 'Success create order',
        data: {
          order_id: data.insertId,
          total_items: cartItem.length,
          total_price: total,
        },
      });
    } catch (err) {
      res.status(500).json({
        message: 'Internal server error',
        error: err,
      });
    }
  },
};

export default orderControllers;
