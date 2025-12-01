import { MdLogout, MdOutlineDashboard, MdOutlineShoppingBag } from "react-icons/md";
import { Link } from "react-router";

export const UserMenu = () => {
  
  return (
    <nav className="p-6 md:p-4">
      <div className="flex flex-col border-b-2 border-gray-200 px-2 pb-3">
        <span className="text-lg font-semibold text-slate-900">LuisPv</span>
        <span className="text-sm text-slate-500">luispv@gmail.com</span>
      </div>

      <ul className="border-b-2 border-gray-200 py-3">
        <Link to='/purchases' className="flex items-center px-2 gap-2 text-gray-600 hover:bg-gray-200 transition-all cursor-pointer py-2">
          <MdOutlineShoppingBag className="w-5 h-5 text-slate-500" />
          <span className="text-sm font-medium">Mis Compras</span>
        </Link>

        <Link to='/admin' className="flex items-center px-2 gap-2 text-gray-600 hover:bg-gray-200 transition-all cursor-pointer py-2">
          <MdOutlineDashboard className="w-5 h-5 text-slate-500" />
          <span className="text-sm font-medium">Dashboard</span>
        </Link>
      </ul>

      <button className="w-full flex items-center justify-center gap-3 rounded border border-red-300 bg-red-50 text-red-600 font-semibold py-2 hover:bg-red-100 transition mt-6 cursor-pointer">
        <span>Cerrar Sesión</span>
        <MdLogout className="text-xl" />
      </button>
    </nav>
  );
};