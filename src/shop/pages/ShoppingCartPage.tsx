import { MdDeleteOutline } from "react-icons/md";
import { useShopStore } from "../store/shop.store";
import { currencyFormatters } from "../../utils/currency-formatter";
import { useAuthStore } from "../../auth/store/auth.store";
import { NotAuthenticated } from "../../auth/components/NotAuthenticated";

export const ShoppingCartPage = () => {
  const compras = useShopStore((state) => state.items);
  const deleteItem = useShopStore((state) => state.deleteItem);
  const increaseQty = useShopStore((state) => state.increaseQty);
  const decreaseQty = useShopStore((state) => state.decreaseQty);
  const totalPrice = useShopStore((state) => state.totalPrice());
  const totalItems = useShopStore((state) => state.totalItems());
  const isAuth = useAuthStore((state) => state.isAuthenticated)

  if(!isAuth) return <NotAuthenticated />

  return (
    <div className="pb-20">
      <h2 className="text-lg text-gray-700 font-bold border-b--2 border-gray-300 mt-6">
        Tu carrito de compras
      </h2>

      {totalItems !== 0 
      ? (
        <div className="md:flex md:gap-10 md:mt-6">
          <div className="pt-4 md:flex-2">
            {compras.map((compra) => (
              <div
                key={compra.product.id}
                className="flex border-b-2 border-gray-300 py-4 px-4 space-x-6"
              >
                <div className="image">
                  <img
                    src={compra.product.images[0]}
                    alt={compra.product.title}
                    className="w-22 md:w-30 object-cover"
                  />
                </div>

                <div className="info flex flex-col flex-1 justify-between">
                  
                  <div className="font-semibold text-sm md:text-lg">
                    {compra.product.title}
                  </div>

                  <div className="flex gap-4 items-center">
                    <div className="text-sm flex ">
                      $ {compra.product.price * compra.quantity}
                    </div>

                    <div className="flex justify-end bg-gray-200 rounded-full py-[3px] ml-auto">
                      <button
                        className=" w-5 h-5 flex items-center justify-center cursor-pointer text-gray-600"
                        onClick={() => decreaseQty(compra.product.id)}
                      >
                        -
                      </button>
                      <div className=" text-center px-2 text-sm">
                        {compra.quantity}
                      </div>
                      <button
                        className="w-5 h-5 flex items-center justify-center cursor-pointer text-gray-600"
                        onClick={() => increaseQty(compra.product.id)}
                      >
                        +
                      </button>
                    </div>

                    <button
                      className="cursor-pointer"
                      onClick={() => deleteItem(compra.product.id)}
                    >
                      <MdDeleteOutline className="text-gray-500 md:w-5 md:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="h-full mt-4 md:mt-0 md:border md:border-gray-200 md:p-4 md:shadow-lg flex-1 rounded-2xl">
            <div className="flex justify-between">
              <div className="text-gray-700 font-semibold text-mg">Total:</div>
              <div>$ {currencyFormatters(totalPrice)}</div>
            </div>

            <div className="mt-8 md:border-t border-gray-300 pt-4">
              <button className="bg-gray-700 w-full py-2 rounded color-white hover:bg-gray-800 transition cursor-pointer text-white">
                Pagar
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-6 text-center text-gray-600 font-semibold">
          No hay productos en el carrito
        </div>
      )}
    </div>
  );
};
