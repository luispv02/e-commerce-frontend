import { IoMdClose } from "react-icons/io";
import { FiltersGeneral } from "./FiltersGeneral";
import { CategoryFilters } from "./CategoryFilters";
import type { Filter } from "../../../interfaces/filters";
import { useProductsStore } from "../../store/products.store";
import { Loading } from "../../../components/ui/Loading";

interface Props {
  selectedCategory: Filter[];
}

export const FiltersMobile = ({selectedCategory}: Props) => {

  const loading = useProductsStore((state) => state.loading);
  const isFilterOpen = useProductsStore((state) => state.isProductFiltersOpen)
  const setIsProductFiltersOpen = useProductsStore((state) => state.setIsProductFilterOpen);

  return (
    <div className={`fixed lg:hidden transition-all duration-400 ease-in-out inset-0 z-50 ${isFilterOpen ? 'bg-black/60 pointer-events-auto' : 'bg-transparent pointer-events-none'}`} onClick={() => setIsProductFiltersOpen(false)}>

      <div className={`h-[70vh] py-10 px-6 absolute left-0 right-0 rounded-t-2xl bg-white transition-all duration-400 ease-in-out ${isFilterOpen ? 'bottom-0' : '-bottom-full'} `} onClick={(e) => e.stopPropagation()}>

        {
          (isFilterOpen && loading) && (
            <div className="absolute inset-0 bg-black/60 text-white flex justify-center items-center z-50 backdrop-blur-xs">
              <Loading message="Cargando productos..." textColor="text-white" borderStyle="border-t-white"/>
            </div>
          )
        }
        
        <div className="h-full overflow-auto">
          <button className="absolute top-3 right-3 cursor-pointer" onClick={() => setIsProductFiltersOpen(false)}>
            <IoMdClose className="w-6 h-6" />
          </button>

          <FiltersGeneral />
          <CategoryFilters selectedCategory={selectedCategory} />
        </div>
      </div>
    </div>
  );
};