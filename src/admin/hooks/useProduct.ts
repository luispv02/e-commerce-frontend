import type { AxiosError } from "axios"
import type { ApiError, ProductResponse } from "../../interfaces/product"
import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../actions/products.action"

export const useProduct = (productId: string) => {

  return useQuery<ProductResponse, AxiosError<ApiError>>({
    queryKey: ['product', 'admin', productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  })
}
