import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../actions/get-products.action'
import type { ProductError, ProductsFilters, ProductsResponse } from '../interface/product'
import type { AxiosError } from 'axios'

export const useProducts = (filters: ProductsFilters) => {

  const productsQuery = useQuery<ProductsResponse, AxiosError<ProductError>>({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
    staleTime: 1000 * 60 * 5
  })

  return {
    productsQuery,
  }    
}
