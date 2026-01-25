import { useSearchParams } from "react-router";

export const useProductsFilters = () => {

  const [searchParams] = useSearchParams();

  const filters = {
    q: searchParams.get('q') || undefined,
    category: searchParams.get('category') || 'all',
    order: searchParams.get('order') || undefined,
    price: searchParams.get('price') || undefined,
    page: Number(searchParams.get('page')) || 1,
    sizes: searchParams.get('sizes') || undefined,
    gender: searchParams.get('gender') || undefined,
    colors: searchParams.get('colors') || undefined,
    brand: searchParams.get('brand') || undefined,
    type: searchParams.get('type') || undefined
  }

  return {
    filters
  }
}

