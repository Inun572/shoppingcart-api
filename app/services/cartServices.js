export const recalculateTotals = (Cart) => {
  Cart.totalItems = Cart.items.length;
  Cart.totalAmount = Cart.items.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
};

export const emptyCart = (Cart) => {
  Cart.items = [];
  Cart.totalItems = 0;
  Cart.totalAmount = 0;
};
