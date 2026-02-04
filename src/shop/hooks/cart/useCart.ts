
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../actions/cart-action";
import type { CartResponse } from "../../interface/cart";
import type { AxiosError } from "axios";
import type { ApiError } from "../../../interfaces/product";
import { useAuthStore } from "../../../auth/store/auth.store";

export const useCart = () => {
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const userId = useAuthStore((state) => state.user?.id);

  return useQuery<CartResponse, AxiosError<ApiError>>({
    queryKey: ['cart', userId],
    queryFn: getCart,
    staleTime: 1000 * 60 * 5,
    enabled: isAuth && !!userId
  })
}

