import { useMutation, useQueryClient } from "@tanstack/react-query"
import { checkoutPurchaseCart } from "../../actions/orders.action"
import { toast } from "react-toastify"
import type { CheckoutResponse } from "../../interface/order";
import type { AxiosError } from "axios";
import type { Error } from "../../interface/product";

export const usePurchaseCart = () => {
  const queryClient = useQueryClient();

  return useMutation<CheckoutResponse, AxiosError<Error>, void>({
    mutationFn: checkoutPurchaseCart,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(data.msg || 'Productos comprados exitosamente')
    },
    onError: (error) => {
      toast.error(error.response?.data.msg || 'Error al intertar comprar')
    }
  })
}
