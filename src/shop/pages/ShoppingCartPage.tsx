import { useAuthStore } from "../../auth/store/auth.store";
import { NotAuthenticated } from "../../auth/components/NotAuthenticated";
import { useCart } from "../hooks/cart/useCart";
import { useCartMutations } from "../hooks/cart/useCartMutations";
import { CartItem } from "../components/cart/CartItem";
import { Loading } from "../../components/ui/Loading";
import type { UpdateCartItemDTO } from "../interface/cart";
import { CartSummary } from "../components/cart/CartSummary";

export const ShoppingCartPage = () => {
  const { data, error, isLoading } = useCart();
  const { deleteItemMutation, updateQuantityItem } = useCartMutations();
  const isAuth = useAuthStore((state) => state.isAuthenticated)

  if(!isAuth) return <NotAuthenticated />
  if(isLoading) return <Loading message="Obteniendo productos..."/>
  if(error) return <p className="text-center text-sm">{ error?.response?.data.msg || 'Error al obtener productos.'}</p>

  const items = data?.cart.items ?? [];

  const updatingProductId = updateQuantityItem.isPending ? updateQuantityItem.variables?.cartItemId : null;
  const deletingProductId = deleteItemMutation.isPending ? deleteItemMutation.variables : null;
  
  const handleUpdatedQuantityItem = ({cartItemId, quantity}: UpdateCartItemDTO) => {
    updateQuantityItem.mutate({cartItemId, quantity})
  }

  const handleDeleteItem = (cartItemId: string) => {
    deleteItemMutation.mutate(cartItemId);
  }

  return (
    <div className="pb-20">
      <h2 className="text-lg text-gray-700 font-bold border-b--2 border-gray-300 mt-6">
        Tu carrito de compras
      </h2>

      {items.length !== 0 
      ? (
        <div className="md:flex md:gap-10 md:mt-6">
          <div className="pt-4 flex-2">
            {items.map((item) => (
              <CartItem key={item.id} item={item} onUpdateQuantity={handleUpdatedQuantityItem} onDeleteItem={handleDeleteItem} isUpdating={item.id === updatingProductId} isDeleting={item.id === deletingProductId} />
            ))}
          </div>

          <CartSummary items={items}/>
        </div>
      ) : (
        <p className="mt-6 text-center text-gray-600 font-semibold">
          No hay productos en el carrito
        </p>
      )}
    </div>
  );
};
