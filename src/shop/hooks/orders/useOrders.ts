import { useQuery } from "@tanstack/react-query"
import { getOrders } from "../../actions/orders.action"
import type { GetOrderResponse } from "../../interface/order"
import type { AxiosError } from "axios"
import type { Error } from "../../interface/product"

export const useOrders = () => {
  return useQuery<GetOrderResponse, AxiosError<Error>>({
    queryKey: ['orders'],
    queryFn: getOrders,
    staleTime: 1000 * 60 * 5
  })
}

