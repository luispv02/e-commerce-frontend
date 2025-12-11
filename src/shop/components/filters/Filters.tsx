import { useState } from "react";
import { LiaFilterSolid } from "react-icons/lia";
import { FiltersGeneral } from "./FiltersGeneral";
import { useSearchParams } from "react-router";
import { clothesFilters } from "../../../data/filters/clothes-filters";
import { technologyFilters } from "../../../data/filters/technology-filters";
import type { Filter } from "../../../interfaces/filters";
import { CategoryFilters } from "./CategoryFilters";
import type { Category } from "../../../interfaces/category";
import { FiltersMobile } from "./FiltersMobile";

const CATEGORY_FILTERS: Record<Category, Filter[]> = {
  all: [],
  clothes: clothesFilters,
  technology: technologyFilters,
  others: []
};

export const Filters = () => {
  const [open, setOpen] = useState(false);

  const [searchParams] = useSearchParams();
  const currentCategory = (searchParams.get('category') as Category) || 'all';

  const selectedCategory = CATEGORY_FILTERS[currentCategory];

  return (
    <section>
      <div className="flex justify-end items-center lg:hidden">
        <button className="cursor-pointer" onClick={() => setOpen(true)}>
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
        open={open}
        onClose={() => setOpen(false)} 
        selectedCategory={selectedCategory}
      />
    </section>
  );
};