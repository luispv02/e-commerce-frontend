import { IoMdClose } from "react-icons/io";
import { FiltersGeneral } from "./FiltersGeneral";
import { CategoryFilters } from "./CategoryFilters";
import type { Filter } from "../../../interfaces/filters";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedCategory: Filter[];
}

export const FiltersMobile = ({open, onClose, selectedCategory}: Props) => {
  
  return (
    <div className={`fixed lg:hidden transition-all duration-400 ease-in-out inset-0 z-50 ${open ? 'bg-black/60 pointer-events-auto' : 'bg-transparent pointer-events-none'}`} onClick={onClose}>

      <div className={`h-[70vh] py-10 px-6 absolute left-0 right-0 rounded-t-2xl bg-white transition-all duration-400 ease-in-out overflow-auto ${open ? 'bottom-0' : '-bottom-full'} `} onClick={(e) => e.stopPropagation()}>
        <button className="absolute top-3 right-3 cursor-pointer" onClick={onClose}>
          <IoMdClose className="w-6 h-6" />
        </button>

        <FiltersGeneral />
        <CategoryFilters selectedCategory={selectedCategory} />
      </div>
    </div>
  );
};