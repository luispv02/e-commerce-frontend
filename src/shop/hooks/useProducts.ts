import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../actions/get-products.action'
import type { ProductsFilters } from '../interface/product'

export const useProducts = (filters: ProductsFilters) => {

  const productsQuery = useQuery({
    queryKey: ['products', filters],
    queryFn: () => getProducts(filters),
    staleTime: 1000 * 60 * 5
  })

  return {
    productsQuery,
  }    
}
