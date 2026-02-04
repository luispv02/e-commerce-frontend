import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../actions/products.action';
import type { ApiError, ProductsFilters, ProductsResponse } from '../../interfaces/product';
import type { AxiosError } from 'axios';

export const useProducts = (filters: ProductsFilters) => {
  
  return useQuery<ProductsResponse, AxiosError<ApiError>>({
    queryKey: ['products', 'admin', filters],
    queryFn: () => getProducts(filters),
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}
