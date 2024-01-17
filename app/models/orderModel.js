import { nanoid } from 'nanoid';

class Order {
  constructor() {
    this.orderId = nanoid(4);
    this.items = [];
    this.totalAmount = 0;
    this.isPaid = false;
    this.isCanceled = false;
    this.createdAt = new Date();
    this.updatedAt = null;
  }
}

export default Order;
