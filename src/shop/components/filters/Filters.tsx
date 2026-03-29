import { LiaFilterSolid } from "react-icons/lia";
import { FiltersGeneral } from "./FiltersGeneral";
import { useSearchParams } from "react-router";
import { clothesFilters } from "../../../data/filters/clothes-filters";
import { technologyFilters } from "../../../data/filters/technology-filters";
import type { Filter } from "../../../interfaces/filters";
import { CategoryFilters } from "./CategoryFilters";
import type { Category } from "../../../interfaces/category";
import { FiltersMobile } from "./FiltersMobile";
import { useProductsStore } from "../../store/products.store";

const CATEGORY_FILTERS: Record<Category, Filter[]> = {
  all: [],
  clothes: clothesFilters,
  technology: technologyFilters,
  others: []
};

export const Filters = () => {
  const setIsProductFiltersOpen = useProductsStore((state) => state.setIsProductFilterOpen);

  const [searchParams] = useSearchParams();
  const currentCategory = (searchParams.get('category') as Category) || 'all';

  const selectedCategory = CATEGORY_FILTERS[currentCategory];

  return (
    <section data-testid="filters">
      <div className="flex justify-end items-center lg:hidden">
        <button name="Abrir filtros" className="cursor-pointer" onClick={() => setIsProductFiltersOpen(true)}>
          <LiaFilterSolid className="h-6 w-6" />
        </button>
      </div>

      {/* Web */}
      <div className="hidden lg:block">
        <FiltersGeneral />
        <CategoryFilters selectedCategory={selectedCategory} />
      </div>

      {/* Mobile */}
      <FiltersMobile
        selectedCategory={selectedCategory}
      />
    </section>
  );
};