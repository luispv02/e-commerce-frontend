
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../../actions/cart-action";
import type { CartResponse } from "../../interface/cart";
import type { AxiosError } from "axios";
import type { Error } from "../../interface/product";
import { useAuthStore } from "../../../auth/store/auth.store";

export const useCart = () => {
  const isAuth = useAuthStore((state) => state.isAuthenticated);

  return useQuery<CartResponse, AxiosError<Error>>({
    queryKey: ['cart'],
    queryFn: getCart,
    staleTime: 1000 * 60 * 5,
    enabled: isAuth
  })
}

