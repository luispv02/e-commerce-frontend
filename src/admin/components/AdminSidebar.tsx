import { MdArrowBackIosNew, MdLogout } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";
import { adminMenuItems } from "../../data/admin/menu-items";
import { useAuthStore } from "../../auth/store/auth.store";

export const AdminSidebar = () => {

  const logout = useAuthStore((state) => state.logout)
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
    navigate('/', { replace: true })
  }

  return (
    <div className="h-screen flex flex-col">

      <div className="flex items-center justify-center gap-5">
        <Link to="/">
          <MdArrowBackIosNew className="w-5 h-5"/>
        </Link>
        
        <div className="text-center py-5 ">
          <span className="text-gray-700 text-lg font-semibold">E-Commerce Admin</span>
        </div>
      </div>

      <ul className="flex flex-col mt-4">
        {adminMenuItems.map(item => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end
              className={({ isActive }) => `flex items-center gap-3 px-6 py-4 cursor-pointer transition ${isActive ? "bg-blue-200 text-blue-700" : "text-gray-700 hover:bg-gray-200"}`} >
              <item.icon size={20}/>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto p-4 border-t border-gray-300">
        <button className="w-full bg-red-100 border border-red-300 rounded text-[12px] px-2 py-2 flex items-center justify-center gap-1 text-red-700 cursor-pointer hover:bg-red-200 hover:border-red-400 transition" onClick={handleLogout}>
          Cerrar sesión
          <MdLogout className="text-sm" />
        </button>
      </div>

    </div>
  );
};
