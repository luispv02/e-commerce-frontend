import type { Filter } from "../../../interfaces/filters";
import { useFilters } from "../../hooks/useFilters";


export const FiltersGroup = ({ title, filterKey, options }: Filter) => {

  const { currentFilter, handleFilterChange } = useFilters(filterKey)
  
  return (
    <div className="">
      <span className="text-gray-700 text-sm mb-2 block">{title}</span>
      <div className="flex flex-wrap gap-2">

        {options.map((option) => (
          <button
            key={option.id}
            className={`cursor-pointer px-4 py-1 rounded-full text-sm border transition flex items-center gap-2 
              ${currentFilter.includes(option.id)
                ? option.hex
                  ? 'border-black'
                  : 'bg-black text-white border-black'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
              }`}
            onClick={() => handleFilterChange(option.id)}>
            {
              option.hex && (
                <div className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: option.hex }} />
              )
            }
            {option.label}
          </button>
        ))}

      </div>
    </div>
  );
};