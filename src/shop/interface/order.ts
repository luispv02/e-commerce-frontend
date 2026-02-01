import type { Order } from "../../interfaces/order";

export interface GetOrderResponse {
  ok: boolean;
  orders: Order[];
}

export interface CheckoutResponse {
  ok: boolean;
  msg: string;
  order: Order
}
