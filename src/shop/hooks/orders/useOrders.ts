import { useQuery } from "@tanstack/react-query"
import { getOrders } from "../../actions/orders.action"
import type { GetOrderResponse } from "../../interface/order"
import type { AxiosError } from "axios"
import type { ApiError } from "../../../interfaces/product"
import { useAuthStore } from "../../../auth/store/auth.store"

export const useOrders = () => {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery<GetOrderResponse, AxiosError<ApiError>>({
    queryKey: ['orders', userId],
    queryFn: getOrders,
    staleTime: 1000 * 60 * 5,
    enabled: isAuth && !!userId
  })
}

