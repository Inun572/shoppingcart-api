import db from '../config/dbConfig.js';

export const getProducts = async () => {
  const [data] = await db.query('SELECT * FROM products');
  return data;
};

export const getProductById = async (id) => {
  const [data] = await db.query(
    'SELECT * FROM products WHERE id = ?',
    [id]
  );
  return data[0];
};

export const addProduct = async (product) => {
  const { name, category, price, description } = product;
  const query = `INSERT INTO products (name, category, price, description) VALUES (?, ?, ?, ?);`;
  const [data] = await db.query(query, [
    name,
    category,
    price,
    description,
  ]);
  return data;
};
