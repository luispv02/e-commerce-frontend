import { useQuery } from "@tanstack/react-query"
import { getOrders } from "../../actions/orders.action"
import type { GetOrderResponse } from "../../interface/order"
import type { AxiosError } from "axios"
import type { ApiError } from "../../../interfaces/product"

export const useOrders = () => {
  return useQuery<GetOrderResponse, AxiosError<ApiError>>({
    queryKey: ['orders'],
    queryFn: getOrders,
    staleTime: 1000 * 60 * 5
  })
}

