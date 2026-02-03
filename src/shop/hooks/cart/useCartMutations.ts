
import { addToCart, deleteCartItem, updateItem } from "../../actions/cart-action";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { CartProductData, CartResponse } from "../../interface/cart";
import type { Error } from "../../interface/product";
import type { AxiosError } from "axios";
import { useAuthStore } from "../../../auth/store/auth.store";

export const useCartMutations = () => {
  const queryClient = useQueryClient();

  const setCartCache = (data: CartResponse) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;
    queryClient.setQueryData(['cart', userId], data);
  };

  const addItemMutation = useMutation<CartResponse, AxiosError<Error>, CartProductData>({
    mutationFn: addToCart,
    onSuccess: setCartCache,
    onError: (error) => {
      toast.error(error.response?.data.msg || 'Error al agregar producto al carrito')
    }
  })

  const updateQuantityItem = useMutation<CartResponse, AxiosError<Error>, CartProductData>({
    mutationFn: updateItem,
    onSuccess: setCartCache,
    onError: (error) => {
      toast.error(error.response?.data.msg || 'Error al actualizar producto')
    }
  })

  const deleteItemMutation = useMutation<CartResponse, AxiosError<Error>, string>({
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

