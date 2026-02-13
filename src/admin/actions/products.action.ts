
import ecommerceApi from "../../api/ecommerceApi"
import type { ProductResponse, ProductsFilters, ProductsResponse } from "../../interfaces/product";

export const getProducts = async(filters: ProductsFilters):Promise<ProductsResponse> => {
  const params = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value))

  const response = await ecommerceApi.get<ProductsResponse>('/admin/products', { params });
  return response.data;
}

export const getProductById = async(productId: string): Promise<ProductResponse> => {
  const response = await ecommerceApi.get<ProductResponse>(`/admin/products/${productId}`);
  return response.data;
}

export const createUpdateProduct  = async({ product, productId }: { product: FormData, productId: string }): Promise<ProductResponse> => {
  const response = await ecommerceApi<ProductResponse>({
    url: productId ? `/admin/products/${productId}` : '/admin/products',
    method: productId ? 'PUT' : 'POST' ,
    data: product
  });

  return response.data;
}

export const deleteProduct  = async(id: string): Promise<ProductResponse> => {
  const response = await ecommerceApi.delete<ProductResponse>(`/admin/products/${id}`);
  return response.data;
}