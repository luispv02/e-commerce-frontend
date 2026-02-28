
import { NotAuthenticated } from "../../auth/components/NotAuthenticated";
import { useAuthStore } from "../../auth/store/auth.store";
import { Loading } from "../../components/ui/Loading";
import { currencyFormatters } from "../../utils/currency-formatter";
import { dateFormatter } from "../../utils/date-formatter";
import { getColorLabel } from "../../utils/get-color-label";
import { useOrders } from "../hooks/orders/useOrders";

export const PurchasesPage = () => {

  const { data, isLoading, error } = useOrders()
  const isAuth = useAuthStore((state) => state.isAuthenticated)

  if(isLoading) return <Loading message="Cargando compras..." />
  if(error) return <p className="text-center text-sm">{error.response?.data.msg || 'Error al obtener productos'}</p>

  const orders = data?.orders ?? [];

  if(!isAuth) return <NotAuthenticated />

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-lg text-gray-700 font-bold border-b--2 border-gray-300 mt-6">Mis Compras</h2>

      <div className="mt-6">
        <div>
          {
            orders.length > 0
            ? orders.map(order => (
              <div key={order.id} className="border border-gray-300 rounded bg-gray-100 mb-4">
                <div className="p-2 md:px-6 flex justify-between items-center">
                  <div className="text-xs">{order.id}</div>
                  <div className="text-xs text-end">{dateFormatter(order.createdAt)}</div>
                </div>

                {
                  order.items.map(item => (
                    <div key={item.id} className="flex border-t border-gray-400 px-2 md:px-6 py-3 gap-3">
                      <div className="image">
                        <img src={item.images[0].url} alt={item.title} className="w-22 h-30 md:w-30 object-contain" />
                      </div>

                      <div className="info flex flex-col flex-1 justify-between items-start">
                        <div className="md:text-left">
                          <h4 className="font-semibold text-sm md:text-lg">{item.title}</h4>
                        </div>

                        <div>
                            <p className="text-xs lg:text-sm">Cantidad: <span className="font-bold">{item.quantity}</span></p>
                            <p className="text-xs lg:text-sm">Precio unidad: <span className="font-bold">${currencyFormatters(item.pricePaid)}</span></p>
                            <p className="text-xs lg:text-sm">Subtotal: <span className="font-bold">${currencyFormatters(item.pricePaid * item.quantity)}</span></p>

                          {
                            item.variants?.color && item.variants.size && 
                            <div className="flex gap-3">
                              <p className="text-xs lg:text-sm">Color: <span className="font-bold capitalize">{getColorLabel(item.variants?.color)}</span></p>
                              <p className="text-xs lg:text-sm">Talla: <span className="font-bold uppercase">{item.variants.size}</span></p>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  ))
                }
                <div className="p-2 md:px-6 flex justify-end border-t border-gray-300">
                  <p className="font-semibold">Total: ${currencyFormatters(order.total)}</p>
                </div>
              </div>
            ))
            : <div className="text-center text-sm">Aun no has comprado productos</div>
          }
        </div>
      </div>
    </div>
  );
};