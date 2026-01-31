import type { MouseEvent } from "react";
import type { Product } from '../../../interfaces/product';
import { useAuthStore } from "../../../auth/store/auth.store";
import { useProductsStore } from "../../store/products.store";
import { useNavigate } from "react-router";
import { useCartMutations } from "../../hooks/useCartMutations";

interface Props {
  product: Product;
  className?: string;
}

export const AddToCartButton = ({product, className = ""}: Props) => {
  const isAuth = useAuthStore((state) => state.isAuthenticated)
  const setSelectedProduct = useProductsStore((state) => state.setSelectedProduct)
  const navigate = useNavigate();
  const { addItemMutation } = useCartMutations();

  const handleAddItem = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if(!isAuth){
      setSelectedProduct(product.id)
      navigate('/auth/login', { state: { from: location.pathname }});
      return;
    }
    addItemMutation.mutate({productId: product.id, quantity: 1});
  }

  return (
    <button 
      disabled={product.stock === 0 || addItemMutation.isPending}
      className={`w-full bg-slate-900 font-semibold text-white transition hover:bg-slate-700 cursor-pointer flex flex-col items-center ${product.stock === 0 || addItemMutation.isPending ? 'opacity-50' : 'cursor-pointer hover:bg-gray-700'} ${className}`} 
      onClick={(e) => handleAddItem(e)}>
      { 
        addItemMutation.isPending 
        ? <div className="w-4 h-4 border border-transparent border-t-white rounded-full animate-spin"></div>
        : <span> {product.stock === 0 ? 'Producto sin stock' : 'Agregar al Carrito'} </span>
      }
      
    </button>
  )
}
