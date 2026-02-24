import { useLocation, useNavigate } from "react-router";
import { useAuthStore } from "../../../auth/store/auth.store";
import type { Product } from "../../../interfaces/product";
import { useProductsStore } from "../../store/products.store";
import { useCartMutations } from "./useCartMutations";


export const useAddToCart = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { addItemMutation } = useCartMutations();
  const productVariant = useProductsStore((state) => state.productVariant)
  const resetProductVariant = useProductsStore((state) => state.resetProductVariant);
  const setModalOpen = useProductsStore((state) => state.setModalOpen);
  const setSelectedProduct = useProductsStore((state) => state.setSelectedProduct)
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  

  const selectedColor = productVariant.selectedColor;
  const selectedSize = productVariant.selectedSize;


  const addProductoToCart = (product: Product) => {
    const isClothingProduct = product.category === 'clothes';
  
    setSelectedProduct(product)
    
    if((pathname === '/' && isClothingProduct) && (!selectedColor || !selectedSize)){
      setModalOpen(true);
      return;
    }

    if(!isAuth){
      navigate('/auth/login', { state: { from: pathname }});
      return;
    }

    addItemMutation.mutate({productId: product.id, quantity: 1}, {
      onSuccess: () => {
        resetProductVariant()
        setModalOpen(false)
      }
    });
  }


  return {
    addProductoToCart,
    loading: addItemMutation.isPending
  }
}