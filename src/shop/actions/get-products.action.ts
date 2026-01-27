
import ecommerceApi from "../../api/ecommerceApi"
import type { ProductsResponse, ProductsFilters, ProductResponse } from "../interface/product";


export const getProducts  = async(filters: ProductsFilters): Promise<ProductsResponse> => {

  const params = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value))

  const response = await ecommerceApi.get<ProductsResponse>('/products', { params });
  return response.data;
}

export const getProductById = async(productId: string): Promise<ProductResponse> => {
  const response = await ecommerceApi.get<ProductResponse>(`/products/${productId}`);
  return response.data;
}