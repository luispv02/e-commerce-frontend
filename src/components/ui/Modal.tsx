import type { ReactNode } from "react"
import { IoMdClose } from "react-icons/io"

interface Props {
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal = ({ title, children, isOpen, onClose }: Props) => {
  
  return (
    <div className={`fixed w-full h-full inset-0 z-50 flex justify-center items-center transition duration-300 ${isOpen ? "bg-black/50" : "pointer-events-none bg-transparent"}`} onClick={onClose}>
      <div className={`max-w-xl max-h-[80vh] overflow-y-auto bg-white rounded-lg transition duration-300 ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-0"}`} onClick={(e) => e.stopPropagation()}>
         <button className="cursor-pointer block ml-auto mt-3 mr-3 mb-6 transition-transform hover:scale-110" onClick={onClose}>
            <IoMdClose />
          </button>

          { title && <h2 className="text-center font-semibold px-6">{title}</h2> }
         
          <div className="py-6 px-4">
            { children }
          </div>
      </div>
    </div>
  )
}
