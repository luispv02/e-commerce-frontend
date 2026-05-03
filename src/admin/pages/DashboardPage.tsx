import { useState } from "react";
import { useAdminDashboard } from "../hooks/useDashboard";
import { DashboardContent } from "../components/dashboard/DashboardContent";
import { DashboardDateRangeFilter } from "../components/dashboard/DashboardDateRangeFilter";
import { PageTitle } from "../components/layout/PageTitle";
import { DASHBOARD_DATE_RANGES, DEFAULT_DASHBOARD_DATE_RANGE, type DashboardDateRangeId } from "../../data/admin/dashboard";
import { Loading } from "../../components/ui/Loading";

export const DashboardPage = () => {
  const [dateRange, setDateRange] = useState<DashboardDateRangeId>(DEFAULT_DASHBOARD_DATE_RANGE);
 const { data, isPending, error  } = useAdminDashboard(dateRange);

 if(isPending) return <Loading />
 if(error) return <p className="text-center text-red-500 text-sm">{error.response?.data.msg || 'Error al obtener los datos.'}</p>

  const periodLabel = DASHBOARD_DATE_RANGES.find((r) => r.id === dateRange)?.label ?? dateRange;

  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto space-y-4 sm:space-y-6 pb-6 sm:pb-8">

      <div className="flex justify-between items-start">
        <PageTitle title="Dashboard" subtitle={`Resumen general de métricas y actividad: ${periodLabel}`} />
        
        <DashboardDateRangeFilter value={dateRange} onChange={setDateRange} />
      </div>

      <DashboardContent data={data} />
    </div>
  );
};