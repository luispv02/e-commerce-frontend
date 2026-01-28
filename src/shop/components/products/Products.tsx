
import { ProductList } from "./ProductList";
import { Pagination } from "../../../components/shared/Pagination";
import { Loading } from "../../../components/ui/Loading";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ProductError, ProductsResponse } from "../../interface/product";
import type { AxiosError } from "axios";

interface Props {
  productsQuery: UseQueryResult<ProductsResponse, AxiosError<ProductError>> 
  category: string;
}

export const Products = ({productsQuery, category}: Props) => {

  if(productsQuery.isLoading) return <Loading message="Cargando productos..." borderColor="black" textColor="black" />
  if(!productsQuery.data || productsQuery.data.data.products.length === 0) return <p className="text-center text-sm">No se encontrarón productos</p>
  
  const { products, pagination } = productsQuery.data.data;

  const getNameProducts = (category: string) => {
    const categoryNames: Record<string, string> = {
      clothes: 'Productos de ropa',
      technology: 'Productos de tecnología',
      others: 'Otros productos',
    }

    return categoryNames[category] || 'Todos los productos';
  }

  return (
    <section className="px-4">
      <header className="mb-6 flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-3xl font-semibold text-slate-900">
            { getNameProducts(category) }: {pagination.totalProducts}
          </h2>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductList products={products} />
      </div>
      <div>
        <Pagination totalPages={pagination.totalPages}/> 
      </div>
    </section>
  );
};