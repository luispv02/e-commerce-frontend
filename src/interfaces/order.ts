import type { Product } from "./product";

export interface Order {
  id: string;
  user: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  product: Product;
  quantity: number;
  pricePaid: number;
}