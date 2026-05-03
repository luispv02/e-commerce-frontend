
import type { DashboardResponse } from "../interface/dashboard";
import type { AxiosError } from "axios";
import type { ApiError } from "../../interfaces/product";
import { getDashboardData } from "../actions/dashboard.action";
import { useQuery } from "@tanstack/react-query";


export const useAdminDashboard = (period: string) => {

  return useQuery<DashboardResponse, AxiosError<ApiError>>({
    queryKey: ['dashboardData', period],
    queryFn: () => getDashboardData(period),
    staleTime: 1000 * 60 * 5
  })
};


