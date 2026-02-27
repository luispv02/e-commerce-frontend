
import { addToCart, deleteCartItem, updateItem } from "../../actions/cart-action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { AddCartItemDTO, CartResponse, UpdateCartItemDTO } from "../../interface/cart";
import type { ApiError } from "../../../interfaces/product";
import type { AxiosError } from "axios";
import { useAuthStore } from "../../../auth/store/auth.store";

export const useCartMutations = () => {
  const queryClient = useQueryClient();

  const setCartCache = (data: CartResponse) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;
    queryClient.setQueryData(['cart', userId], data);
  };

  const addItemMutation = useMutation<CartResponse, AxiosError<ApiError>, AddCartItemDTO>({
    mutationFn: addToCart,
    onSuccess: setCartCache,
    onError: (error) => {
      toast.error(error.response?.data.msg || 'Error al agregar producto al carrito')
    }
  })

  const updateQuantityItem = useMutation<CartResponse, AxiosError<ApiError>, UpdateCartItemDTO>({
    mutationFn: updateItem,
    onSuccess: setCartCache,
    onError: (error) => {
      toast.error(error.response?.data.msg || 'Error al actualizar producto')
    }
  })

  const deleteItemMutation = useMutation<CartResponse, AxiosError<ApiError>, string>({
     mutationFn: deleteCartItem,
     onSuccess: setCartCache,
     onError: (error) => {
      toast.error(error.response?.data.msg || 'Error al eliminar producto')
     }
  })

  return {
    addItemMutation,
    updateQuantityItem,
    deleteItemMutation
  }
}

