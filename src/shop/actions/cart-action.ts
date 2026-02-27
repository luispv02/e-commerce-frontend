import ecommerceApi from "../../api/ecommerceApi";
import type { AddCartItemDTO, CartResponse, UpdateCartItemDTO } from "../interface/cart";


export const getCart  = async(): Promise<CartResponse> => {
  const response = await ecommerceApi.get<CartResponse>('/cart');
  return response.data;
}

export const addToCart  = async(product: AddCartItemDTO): Promise<CartResponse> => {
  const response = await ecommerceApi.post<CartResponse>('/cart', product);
  return response.data;
}

export const updateItem  = async({ cartItemId, quantity }: UpdateCartItemDTO): Promise<CartResponse> => {
  const response = await ecommerceApi.put<CartResponse>(`/cart/${cartItemId}`, {quantity});
  return response.data;
}

export const deleteCartItem  = async(id: string): Promise<CartResponse> => {
  const response = await ecommerceApi.delete<CartResponse>(`/cart/${id}`);
  return response.data;
}