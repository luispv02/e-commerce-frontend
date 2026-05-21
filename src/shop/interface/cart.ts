import type { Product, ProductVariant } from "../../interfaces/product";

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
  userid: string;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  stockAvailable: number;
  variants?: ProductVariant;
}

export interface AddCartItemDTO {
  productId: string;
  quantity: number;
  variants?: ProductVariant;
}

export interface UpdateCartItemDTO {
  cartItemId: string;
  quantity: number;
}

export interface CheckoutFormValues {
  fullName: string;
  address: string;
  city: string;
  postalCode: number;
  phone: number;
  notes?: string;
}