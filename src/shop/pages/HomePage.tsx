
import { Carousel } from "../components/layout/Carousel";
import { Categories } from "../components/layout/Categories";
import { Filters } from "../components/filters/Filters";
import { Products } from "../components/products/Products";
import { useProductsFilters } from "../hooks/useProductsFilters";
import { useProducts } from "../hooks/useProducts";
import { Loading } from "../../components/ui/Loading";
import { useProductsStore } from "../store/products.store";
import { useEffect, useRef } from "react";

export const HomePage = () => {

  const { filters } = useProductsFilters();
  const { productsQuery } = useProducts(filters);
  const setLoading = useProductsStore((state) => state.setLoading);
  const isShownInitialLoading = useRef(true);

  // hide loading when applying filter on mobile
  useEffect(() => {
    setLoading(false);
  }, [productsQuery.dataUpdatedAt, setLoading]);

  useEffect(() => {
    if(productsQuery.isSuccess){
      isShownInitialLoading.current = false
    }
  }, [productsQuery.isSuccess])

  // show loading only once
  if(productsQuery.isLoading && isShownInitialLoading.current) return <Loading message="Cargando productos..." borderColor="black" textColor="black" />

  if(productsQuery.error) return <p className="text-center text-sm text-red-600">{ productsQuery.error.response?.data.msg || 'Error al obtener productos' }</p>

  return (
    <div className="space-y-10">
      <Categories />
      <Carousel />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <Filters />
        </div>

        <div className="flex-3">
          <Products productsQuery={productsQuery} category={filters.category}/>
        </div>
      </div>
    </div>
  );
};