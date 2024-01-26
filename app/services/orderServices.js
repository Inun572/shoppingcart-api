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
