
import { ProductList } from "./ProductList";
import { useProducts } from "../../hooks/useProducts";
import { Loading } from "../../../components/ui/Loading";
import { Pagination } from "../../../components/shared/Pagination";
import { useProductsFilters } from "../../hooks/useProductsFilters";

export const Products = () => {

  const { filters } = useProductsFilters();
  const { productsQuery } = useProducts(filters);

  if(productsQuery.isLoading) return <Loading borderColor="black" textColor="black" />
  if(productsQuery.error || !productsQuery.data) return <p className="text-center text-sm text-red-600">Error al obtener productos</p>
  
  const { products, pagination } = productsQuery.data.data;

  if(products.length === 0) return <p className="text-center text-sm">No se encontrarón productos</p>

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
            { getNameProducts(filters.category) }: {pagination.totalProducts}
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