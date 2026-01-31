import ecommerceApi from "../../api/ecommerceApi";
import type { CartProductData, CartResponse } from "../interface/cart";


export const getCart  = async(): Promise<CartResponse> => {
  const response = await ecommerceApi.get<CartResponse>('/cart');
  return response.data;
}

export const addToCart  = async(product: CartProductData): Promise<CartResponse> => {
  const response = await ecommerceApi.post<CartResponse>('/cart', product);
  return response.data;
}

export const updateItem  = async({ productId, quantity }: CartProductData): Promise<CartResponse> => {
  const response = await ecommerceApi.put<CartResponse>(`/cart/${productId}`, {quantity});
  return response.data;
}

export const deleteCartItem  = async(id: string): Promise<CartResponse> => {
  const response = await ecommerceApi.delete<CartResponse>(`/cart/${id}`);
  return response.data;
}