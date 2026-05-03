import ecommerceApi from "../../api/ecommerceApi";
import type { DashboardResponse } from "../interface/dashboard";

export const getDashboardData = async(period: string):Promise<DashboardResponse> => {
  const response = await ecommerceApi.get<DashboardResponse>(`/admin/dashboard?period=${period}`);
  return response.data;
}