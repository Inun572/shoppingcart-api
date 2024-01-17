import Order from '../models/orderModel.js';
import { user1 } from '../models/userModels.js';

const orderControllers = {
  getOrdersHistory: (req, res) => {
    res.json({
      message: 'Get orders history successfully',
      data: user1.orderHistory,
    });
  },
  createOrder: (req, res) => {
    const items = req.body.items; // Item is an array of product id

    if (items.length === 0) {
      return res.status(400).json({
        message: 'Fail create order. Input at least 1 item.',
      });
    }

    if (Products.includes(items)) {
      return res.status(400).json({
        message: 'Fail create order. There is invalid item(s).',
      });
    }

    const newOrder = new Order();
    newOrder.items = items;
    newOrder.totalAmount = items.reduce(
      (acc, item) => acc + Products.find((product) => product.id === item).price
    );

    res.json({
      message: 'Success create order',
      data: newOrder,
    });
  },
  checkoutOrder: (req, res) => {
    const orderId = req.body.orderId;

    if (!orderId) {
      return res.status(400).json({
        message: 'Fail checkout order. Input order id.',
      });
    }

    const orderIndex = user1.orderHistory.findIndex(
      (order) => order.orderId === orderId
    );

    if (orderIndex === -1) {
      return res.status(400).json({
        message: 'Fail checkout order. Invalid order id.',
      });
    }

    const order = user1.orderHistory[orderIndex];

    if (order.isPaid || order.isCanceled) {
      return res.status(400).json({
        message: 'Fail checkout order. Order already paid or canceled.',
      });
    }

    order.isPaid = true;
    res.json({
      message: `Success checkout orderId : ${orderId}`,
      data: order,
    });
  },
  cancelOrder: (req, res) => {
    const orderId = req.body.orderId;

    if (!orderId) {
      return res.status(400).json({
        message: 'Fail checkout order. Input order id.',
      });
    }

    const orderIndex = user1.orderHistory.findIndex(
      (order) => order.orderId === orderId
    );

    if (orderIndex === -1) {
      return res.status(400).json({
        message: 'Fail checkout order. Invalid order id.',
      });
    }

    const order = user1.orderHistory[orderIndex];

    if (order.isPaid || order.isCanceled) {
      return res.status(400).json({
        message: 'Fail checkout order. Order already paid or canceled.',
      });
    }

    order.isCanceled = true;
    res.json({
      message: `Success cancel orderId : ${orderId}`,
      data: order,
    });
  },
};

export default orderControllers;
