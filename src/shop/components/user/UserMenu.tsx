import { MdLogout, MdOutlineDashboard, MdOutlineShoppingBag } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { useAuthStore } from "../../../auth/store/auth.store";
import { HiOutlineLogin } from "react-icons/hi";

export const UserMenu = () => {

  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout)
  const isAuth = useAuthStore((state) => state.isAuthenticated)
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if(isAuth){
      localStorage.removeItem('token');
      logout()
    }else{
      navigate('/auth/login')
    }
  }
  
  return (
    <nav className="p-6 md:p-4">

      {
        isAuth && 
        <div>
          <div className="flex flex-col border-b-2 border-gray-200 px-2 pb-3">
            <span className="text-lg font-semibold text-slate-900">{user?.name}</span>
            {/* <span className="text-sm text-slate-500">{user?.email}</span> */}
          </div>

          <ul className="border-b-2 border-gray-200 py-3">
            <Link to='/purchases' className="flex items-center px-2 gap-2 text-gray-600 hover:bg-gray-200 transition-all cursor-pointer py-2">
              <MdOutlineShoppingBag className="w-5 h-5 text-slate-500" />
              <span className="text-sm font-medium">Mis Compras</span>
            </Link>

            {
              user?.role === 'admin' && 
              <Link to='/admin' className="flex items-center px-2 gap-2 text-gray-600 hover:bg-gray-200 transition-all cursor-pointer py-2">
                <MdOutlineDashboard className="w-5 h-5 text-slate-500" />
                <span className="text-sm font-medium">Dashboard</span>
              </Link>
            }

            
          </ul>
        </div>
      }
      
      
      
      <button className={`w-full flex items-center justify-center gap-3 rounded border font-semibold py-2 transition cursor-pointer ${isAuth ? 'mt-6 bg-red-50 text-red-600 border-red-300 hover:bg-red-100' : 'text-blue-600 border-blue-300 hover:bg-blue-100' }`} onClick={handleLoginLogout}>
        <span>{isAuth ? 'Cerrar Sesión' : 'Iniciar Sesión'}</span>
        {isAuth ? <MdLogout className="text-xl" /> : <HiOutlineLogin className="text-2xl"/> }
      </button>
    </nav>
  );
};