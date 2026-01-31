import type { Product } from "../../interfaces/product";

export interface CartResponse {
  ok: boolean,
  msg?: string;
  cart: Cart
}

export interface Cart {
  createdAt: string;
  id: string;
  items: CartItem[];
  updatedAt: string;
  user: string;
}

export interface CartProductData {
  productId: string;
  quantity: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}