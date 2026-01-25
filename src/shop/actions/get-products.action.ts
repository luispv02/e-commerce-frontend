
import ecommerceApi from "../../api/ecommerceApi"
import type { ProductResponse, ProductsFilters } from "../interface/product";


export const getProducts  = async(filters: ProductsFilters): Promise<ProductResponse> => {

  const params = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value))

  const response = await ecommerceApi.get<ProductResponse>('/products', { params });
  return response.data;
}