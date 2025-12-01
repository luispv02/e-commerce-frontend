import { NavLink } from "react-router";
import { CgShoppingCart } from "react-icons/cg";
import type { ReactElement } from "react";
import { MdOutlineDashboard } from "react-icons/md";

interface MenuItem {
  to: string;
  label: string;
  icon: ReactElement;
}

export const AdminBottomMenu = () => {

  const menuItems: MenuItem[] = [
    { to: "/admin", label: "Dashboard", icon: <MdOutlineDashboard size={20} /> },
    { to: "/admin/products", label: "Productos", icon: <CgShoppingCart size={20} /> },
  ];

  return (
    <nav className="bg-white">
      <ul className="flex w-full justify-around">
        {menuItems.map(item => (
          <li key={item.to} className="list-none w-full">
            <NavLink
              to={item.to}
              end
              className={({ isActive }) => `flex flex-col items-center py-2 transition ${isActive ? "border-t-2 border-blue-500 text-blue-500 font-semibold" : "text-gray-500  border-t-2 border-gray-200"}`} >
              {item.icon}
              <span className="text-[11px]">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
