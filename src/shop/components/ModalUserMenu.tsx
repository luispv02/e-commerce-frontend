import { useEffect, useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { UserMenu } from "./UserMenu";

export const ModalUserMenu = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null)


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => window.removeEventListener("mousedown", handleClickOutside);
  }, [])


  return (
    <div ref={menuRef} className="relative">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='cursor-pointer z-50 relative'>
        <FaRegUser className={`w-6 h-6 text-gray-500 ${isMenuOpen ? 'text-gray-900' : ''}`} />
      </button>

      <div className={`absolute top-10 right-4 w-58 bg-white rounded-md ring ring-gray-300 shadow-lg transition-all duration-300 ${isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-6"}`}
      >
        <UserMenu />
      </div>
    </div>
  );
};