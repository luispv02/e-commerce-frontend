import type { Filter } from "../../../interfaces/filters";
import { FiltersGroup } from "./FiltersGroup";

export const CategoryFilters = ({ selectedCategory }: { selectedCategory: Filter[] }) => {
  
  return (
    <div className="space-y-6 mt-6">
      {
        selectedCategory.map((filter) => (
          <FiltersGroup
            key={filter.filterKey}
            title={filter.title}
            filterKey={filter.filterKey}
            options={filter.options}
          />
        ))
      }
    </div>
  );
};