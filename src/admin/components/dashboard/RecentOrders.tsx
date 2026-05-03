import { currencyFormatters } from "../../../utils/currency-formatter";
import { dateFormatter } from "../../../utils/date-formatter";
import type { RecentOrder } from "../../interface/dashboard";

interface Props {
  orders: RecentOrder[];
}

export const RecentOrders = ({ orders }: Props) => {
  return (
    <div className="overflow-x-auto max-h-80 -mx-px">
      <table className="w-full text-sm min-w-[280px] sm:min-w-[320px]">
        <thead>
          <tr className="bg-gray-100 text-xs text-black text-left">
            <th className="px-4 py-2">Pedido</th>
            <th className="px-4 py-2">Cliente</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2 text-right">Total</th>
          </tr>
        </thead>
        
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-100">
              <td
                className="px-4 py-2.5 font-mono text-xs text-gray-800 max-w-[120px] truncate"
                title={order.id}
              >
                {order.id.slice(-4)}
              </td>
              
              <td className="px-4 py-2.5 text-gray-600">
                {order.customerEmail ?? "—"}
              </td>

              <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap text-xs">
                { dateFormatter(order.date) } 
              </td>

              <td className="px-4 py-2.5 text-right font-medium tabular-nums text-gray-700">
                ${ currencyFormatters(order.total) }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
