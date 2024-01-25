import db from '../config/dbConfig.js';

export const getCart = async () => {
  const [data] = await db.query(
    'SELECT cart.*, products.name, products.price FROM cart JOIN products ON cart.product_id = products.id'
  );
  return data;
};

export const getItemInCart = async (id) => {
  const [data] = await db.query(
    'SELECT * FROM cart WHERE product_id = ?',
    [id]
  );
  return data[0];
};

export const addItem = async (product, quantity) => {
  const { id, price } = product;
  const total = (price * quantity).toFixed(2);
  const query =
    'INSERT INTO cart (product_id, quantity, total) VALUES (?, ?, ?)';
  const [data] = await db.query(query, [
    id,
    quantity,
    total,
  ]);
  return data;
};

export const updateItem = async (product, quantity) => {
  const { id, price } = product;
  const total = (price * quantity).toFixed(2);
  const query =
    'UPDATE cart SET quantity = ?, total = ? WHERE product_id = ?';
  const [data] = await db.query(query, [
    quantity,
    total,
    id,
  ]);
  return data;
};

export const deleteItem = async (productId) => {
  const query = `DELETE FROM cart WHERE product_id = ?`;
  const [data] = await db.query(query, [productId]);

  return data;
};

export const recalculateTotals = (Cart) => {
  Cart.totalItems = Cart.items.length;
  Cart.totalAmount = Cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
};

export const emptyCart = async () => {
  await db.query('DELETE FROM cart');
};
