import type { Product } from "../../interfaces/product";

export interface ProductsResponse {
  ok: boolean;
  data: {
    pagination: Pagination;
    products: Product[];
  }
}

export interface Pagination {
  page: number;
  limit: number;
  totalProducts: number;
  totalPages: number;
}

export interface ProductsFilters {
  q?: string;
  category: string;
  order?: string;
  price?: string;
  page: number;
  size?: string;
  gender?: string;
  color?: string;
  brand?: string;
  type?: string;
}

export interface ProductResponse {
  ok: boolean;
  product: Product;
}

export interface ProductError {
  ok: boolean;
  msg: string;
}