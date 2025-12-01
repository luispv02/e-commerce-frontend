import type { Product } from "./product";

export interface Purchase {
  id: string;
  date: string;
  total: number;
  items: PurchaseItem[];
}

interface PurchaseItem {
  product: Product;
  quantity: number;
  pricePaid: number;
}