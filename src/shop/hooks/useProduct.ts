import { useQuery } from "@tanstack/react-query"
import { getProductById } from "../actions/get-products.action"
import type { ProductError, ProductResponse } from "../interface/product"
import type { AxiosError } from "axios"

export const useProduct = (productId: string) => {

  return useQuery<ProductResponse, AxiosError<ProductError>>({
    queryKey: ['product', productId],
    queryFn: () => getProductById(productId),
    enabled: !!productId,
    staleTime: 1000 * 60 * 5
  })
}
