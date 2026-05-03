
export interface DashboardResponse {
  summary:      Summary;
  sales:        Sale[];
  recentOrders: RecentOrder[];
  topProducts:  TopProduct[];
}

export interface Summary {
  totalRevenue:      number;
  totalOrders:       number;
  unitsSold:         number;
  averageOrderValue: number;
  growth:            number;
  newUsers:          number;
}

export interface Sale {
  date:    string;
  revenue: number;
}

export interface RecentOrder {
  id:            string;
  customerEmail: string;
  customerName:  string;
  date:          string;
  total:         number;
}

export interface TopProduct {
  id:         string;
  name:       string;
  units:      number;
  revenue:    number;
  image:      string;
  percentage: number;
}

