import { useLocation, useNavigate } from "react-router";
import { useProductsStore } from "../../shop/store/products.store";
import { useCartMutations } from "../../shop/hooks/cart/useCartMutations";
import type { AuthError, AuthResponse, UserFormValues } from "../interface/auth";
import type { UseMutationResult } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useAuthSubmit = () => {
  const navigate = useNavigate()
  const location = useLocation();

  const { addItemMutation } = useCartMutations();
  const selectedProduct = useProductsStore((state) => state.selectedProduct)
  const setSelectedProduct = useProductsStore((state) => state.setSelectedProduct)
  const setModalOpen = useProductsStore((state) => state.setModalOpen);
  const resetProductVariant = useProductsStore((state) => state.resetProductVariant);
  const productVariant = useProductsStore((state) => state.productVariant);

  const from = location.state?.from || '/';


  const handleAuthSubmit = async(data: UserFormValues, authMutation: UseMutationResult<AuthResponse, AxiosError<AuthError>, UserFormValues>) => {

    setModalOpen(false);

    try {

      await authMutation.mutateAsync(data);
      
      if(selectedProduct){

        const isClothingProduct = selectedProduct.category === 'clothes';

        const newProductData = {
          productId: selectedProduct.id,
          quantity: 1,
          ...(isClothingProduct && { variants: productVariant })
        }

        await addItemMutation.mutateAsync(newProductData);
        setSelectedProduct(null)
        resetProductVariant()
      }
      navigate(from, { replace: true });
    } catch {
      // Error handled from onError
    }
  }

  return {
    handleAuthSubmit
  }
}
