import type { ProductImage, ProductVariant } from "./product";

export interface Order {
  id: string;
  user: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  id: string;
  productId: string;
  title: string;
  description: string;
  images: ProductImage[];
  quantity: number;
  pricePaid: number;
  variants?: ProductVariant
}