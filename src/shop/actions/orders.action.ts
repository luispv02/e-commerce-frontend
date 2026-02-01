import ecommerceApi from "../../api/ecommerceApi";
import type { CheckoutResponse, GetOrderResponse } from "../interface/order";

export const getOrders  = async(): Promise<GetOrderResponse> => {
  const response = await ecommerceApi.get<GetOrderResponse>('/orders');
  return response.data;
}

export const checkoutPurchaseCart  = async(): Promise<CheckoutResponse> => {
  const response = await ecommerceApi.post<CheckoutResponse>('/cart/checkout');
  return response.data;
}