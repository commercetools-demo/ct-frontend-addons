import { Cart } from '../cart/Cart';
import { Order } from '../cart/Order';
export interface RecurringOrder {
  recurringOrderId: string;
  version: number;
  createdAt: string;
  cart: Cart;
  customerId: string;
  originOrder: Order;
  startsAt: string;
  nextOrderAt: string;
  recurringOrderState: string;
}
