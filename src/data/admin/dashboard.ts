export const DASHBOARD_DATE_RANGES = [
  { id: "7d" as const, label: "7 días" },
  { id: "30d" as const, label: "30 días" },
  { id: "3m" as const, label: "3 meses" },
  { id: "6m" as const, label: "6 meses" },
  { id: "1y" as const, label: "1 año" },
] as const;

export type DashboardDateRangeId = (typeof DASHBOARD_DATE_RANGES)[number]["id"]; 

export const DEFAULT_DASHBOARD_DATE_RANGE: DashboardDateRangeId = "7d";