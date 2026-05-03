
import { FiBarChart2, FiShoppingBag, FiUsers, FiPercent, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import { MdReceiptLong } from "react-icons/md";
import { currencyFormatters } from "../../../utils/currency-formatter";
import { StatCard } from "./StatCard";
import type { DashboardResponse } from "../../interface/dashboard";
import { RecentOrders } from "./RecentOrders";
import { TopSellingProducts } from "./TopSellingProducts";
import { SalesOverTimeChart } from "./SalesOverTimeChart";

const getTextColorByGrowth = (percent: number) => {
  if(percent === 0) return 'text-black';
  if(percent < 0) return 'text-red-600';
  if(percent > 0) return 'text-green-600'
}

interface Props {
  data: DashboardResponse;
}

export const DashboardContent = ({ data }: Props) => {

  const { summary, sales, recentOrders, topProducts } = data;
  const textColorByGrowth = getTextColorByGrowth(summary.growth);


  return (
    <div className="space-y-6 sm:space-y-8 min-w-0">

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
        <StatCard
          title="Ingresos totales"
          value={`$${currencyFormatters(summary.totalRevenue)}`}
          hint="Ingresos por ventas en el periodo"
          icon={<FiDollarSign className="text-xl" />}
          className="bg-green-100 text-green-700 border-green-200"
        />

        <StatCard
          title="Ventas totales (unidades)"
          value={summary.unitsSold}
          hint="Suma de unidades vendidas en el periodo"
          icon={<FiShoppingBag className="text-xl" />}
          className="bg-gray-100 text-gray-600 border-gray-200"
        />

      
        <StatCard
          title="Número de pedidos"
          value={summary.totalOrders}
          hint="Pedidos completados o contabilizados"
          icon={<FiBarChart2 className="text-xl" />}
          className="bg-purple-100 text-purple-800 border-purple-200"
        />
        
        <StatCard
          title="Ticket promedio"
          value={`$${currencyFormatters(summary.averageOrderValue)}`}
          hint="Ingresos ÷ pedidos"
          icon={<MdReceiptLong className="text-xl" />}
          className="bg-cyan-100 text-cyan-800 border-cyan-200"
        />
         <StatCard
          title="Crecimiento"
          value={`${summary.growth}%`}
          hint={"Comparado con el periodo anterior"}
          icon={<FiPercent className="text-xl" />}
          className="bg-yellow-100 text-yellow-800 border-yellow-300"
          textColor={textColorByGrowth}
        />
        
        <StatCard
          title="Usuarios registrados"
          value={summary.newUsers}
          hint="Cuentas de usuario en la plataforma"
          icon={<FiUsers className="text-xl" />}
          className="bg-red-100 text-red-700 border-red-200"
        />
      </div>

      {/* income over time */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm min-w-0 overflow-hidden">
        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
          <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide pr-2">
            Ingresos en el tiempo
          </h2>
          <FiTrendingUp className="text-emerald-600/70 shrink-0 mt-0.5" aria-hidden size={20} />
        </div>
        <p className="text-xs text-gray-600 mb-3 sm:mb-4">
          Ingresos en el tiempo (montos en $ por periodo).
        </p>

        <SalesOverTimeChart sales={sales} />
      </div>

      <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 min-w-0">

        {/* Recent Orders */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden min-w-0">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Pedidos recientes
            </h2>
          </div>
          
          {
            recentOrders.length === 0 
              ? ( <p className="p-5 text-sm text-gray-500">No hay pedidos recientes.</p> ) 
              : ( <RecentOrders orders={recentOrders} /> )
          }
        </div>

        {/* Best selling products */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden min-w-0">
          <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">
              Productos más vendidos
            </h2>
          </div>

          {
            data.topProducts.length === 0 
              ? ( <p className="p-5 text-sm text-gray-500">No hay productos con ventas en el periodo.</p> ) 
              : ( <TopSellingProducts topProducts={topProducts} /> )
          }
        </div>
      </div> 
    </div>
  );
};
