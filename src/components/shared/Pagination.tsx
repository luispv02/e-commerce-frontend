import { useMemo, type ReactNode } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useSearchParams } from "react-router";

interface Props {
  totalPages: number
}

interface NavButtonProps {
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}


export const Pagination = ({ totalPages }: Props) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number((searchParams.get('page'))) || 1;

  const getPagination = ():(number | string)[] => {

    if (totalPages <= 8) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const lastPage = totalPages;
    
    // initial pages
    if(currentPage <= 4){
      return [1, 2, 3, 4, 5, '...', lastPage];
    }

    // final pages
    if(currentPage > lastPage - 4){
      return [1, '...', lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage];
    }

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      lastPage,
    ];
  }
  const pages = useMemo(getPagination, [currentPage, totalPages])

  if(totalPages <= 1) return null;

  const handleChangePage = (page: number) => {
    if(page < 1 || page > totalPages) return;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set('page', page.toString());
    setSearchParams(newSearchParams);
  }

  const NavButton = ({ icon, onClick, disabled, className = '' }: NavButtonProps) => (
    <button className={`cursor-pointer ${className} ${disabled ? 'opacity-50 pointer-events-none' : ''}`} onClick={onClick} >
      {icon}
    </button>
  );

  return ( 
    <div className="flex justify-center items-center mt-8 gap-6">

      <NavButton 
        icon={<MdKeyboardDoubleArrowLeft size={28}/>}
        onClick={() => handleChangePage(1)}
        disabled={currentPage <= 1}
        className="md:hidden"
      />

      
      <NavButton 
        icon={<IoIosArrowBack size={20} />}
        onClick={() => handleChangePage(currentPage - 1)}
        disabled={currentPage <= 1}
      />


      <div className="hidden md:flex items-end gap-2">
        {
          pages.map((p, i) => (
            p === '...' 
            ? <span key={i}>...</span>
            : <button key={i} className={`w-8 h-8 rounded-full cursor-pointer text-sm transition ${currentPage === p ? 'bg-black text-white' : 'border border-gray-400 hover:bg-gray-200'}`} onClick={() => handleChangePage(p as number)}>
                { p }
              </button>
          ))
        }
      </div>

      <div className="md:hidden text-sm">
        { currentPage } / { totalPages }
      </div>

      <NavButton 
        icon={<IoIosArrowForward size={20} />}
        onClick={() => handleChangePage(currentPage + 1)}
        disabled={currentPage === totalPages}
      />

      <NavButton 
        icon={<MdKeyboardDoubleArrowRight size={28} />}
        onClick={() => handleChangePage(totalPages)}
        disabled={currentPage === totalPages}
        className="md:hidden"
      />
    </div>
  )
}
