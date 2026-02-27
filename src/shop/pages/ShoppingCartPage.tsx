import { currencyFormatters } from "../../utils/currency-formatter";
import { useAuthStore } from "../../auth/store/auth.store";
import { NotAuthenticated } from "../../auth/components/NotAuthenticated";
import { useCart } from "../hooks/cart/useCart";
import { useCartMutations } from "../hooks/cart/useCartMutations";
import { CartItem } from "../components/cart/CartItem";
import { Loading } from "../../components/ui/Loading";
import type { UpdateCartItemDTO } from "../interface/cart";
import { usePurchaseCart } from "../hooks/orders/usePurchaseCart";

export const ShoppingCartPage = () => {
  const { data, error, isLoading } = useCart();
  const { deleteItemMutation, updateQuantityItem } = useCartMutations();
  const { mutate, isPending } = usePurchaseCart()
  const isAuth = useAuthStore((state) => state.isAuthenticated)

  if(!isAuth) return <NotAuthenticated />
  if(isLoading) return <Loading message="Obteniendo productos..."/>
  if(error) return <p className="text-center text-sm">{ error?.response?.data.msg || 'Error al obtener productos.'}</p>

  const items = data?.cart.items ?? [];
  const totalPrice = items.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)

  const updatingProductId = updateQuantityItem.isPending ? updateQuantityItem.variables?.cartItemId : null;
  const deletingProductId = deleteItemMutation.isPending ? deleteItemMutation.variables : null;
  
  const handleUpdatedQuantityItem = ({cartItemId, quantity}: UpdateCartItemDTO) => {
    updateQuantityItem.mutate({cartItemId, quantity})
  }

  const handleDeleteItem = (cartItemId: string) => {
    deleteItemMutation.mutate(cartItemId);
  }

  const someProductsAreUnavailable = items.some(item => item.product.isActive === false);

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

          {/* Total */}
          <aside className="h-full mt-4 md:mt-0 md:border md:border-gray-200 md:p-4 md:shadow-lg flex-1 rounded-2xl sticky top-24">
            <div className="flex justify-between">
              <h3 className="text-gray-700 font-semibold">Total:</h3>
              <p>$ {currencyFormatters(totalPrice)}</p>
            </div>

            <div className="mt-8 md:border-t border-gray-300 pt-4">
              <button className={`bg-gray-700 w-full py-2 rounded hover:bg-gray-800 transition text-white ${isPending || someProductsAreUnavailable ? 'opacity-50' : ' cursor-pointer'}`} onClick={() =>  mutate()} disabled={isPending || someProductsAreUnavailable}>
                { isPending ? <Loading width="w-6" height="h-6" message="" textColor="text-white" borderStyle="border-t-white" spinMargin="my-0" /> : 'Pagar' }
              </button>
              { someProductsAreUnavailable && <p className="text-red-500 text-xs  mt-4 mb-2"> Tienes productos no disponibles. Eliminálos para continuar. </p> }
            </div>
          </aside>
        </div>
      ) : (
        <p className="mt-6 text-center text-gray-600 font-semibold">
          No hay productos en el carrito
        </p>
      )}
    </div>
  );
};
