import db from '../config/dbConfig.js';

export const getOrders = async () => {
  const [data] = await db.query('SELECT * FROM orders');
  return data;
};

export const getOrderById = async (id) => {
  const [data] = await db.query(
    'SELECT * FROM orders WHERE id = ?',
    [id]
  );
  return data[0];
};

export const createOrder = async (date, number, total) => {
  const [data] = await db.query(
    'INSERT INTO orders (date, number, total) VALUES (?, ?, ?)',
    [date, number, total]
  );
  return data;
};

export const insertOrderItem = async (
  orderId,
  cartItem
) => {
  const query = `INSERT INTO order_items (order_id, product_id, quantity, price, total) VALUES `;
  const values = cartItem.map((item) => {
    return `(${orderId}, ${item.product_id}, ${item.quantity}, ${item.price}, ${item.total})`;
  });

  const [data] = await db.query(query + values.join(', '));
  return data;
};

export const getOrderDetail = async (orderId) => {
  const [data] = await db.query(
    'SELECT * FROM order_items WHERE order_id = ?',
    [orderId]
  );
  return data;
};
