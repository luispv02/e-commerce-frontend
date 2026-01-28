import { useSearchParams } from "react-router";
import { useProductsStore } from "../store/products.store";


export const useFilters = (filterKey: string) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterKey)?.split(',') || []
  const setLoading = useProductsStore((state) => state.setLoading);
  
  const handleFilterChange = (value: string) => {
    setLoading(true);
    const isMultiSelect = filterKey !== 'gender';
    const existsValue = currentFilter.includes(value);

    const newValues = existsValue
      ? currentFilter.filter(filter => filter !== value)
      : isMultiSelect
        ? [...currentFilter, value]
        : [value]

    const newSearchParams = new URLSearchParams(searchParams);
    if (newValues.length > 0) {
      newSearchParams.set(filterKey, newValues.join(','));
    } else {
      newSearchParams.delete(filterKey);
    }
    setSearchParams(newSearchParams)

  }

  return {
    currentFilter,
    handleFilterChange,
  }
};