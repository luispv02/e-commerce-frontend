import { CgShoppingCart } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { NavLink } from "react-router";
import type { ReactElement } from "react";
import { useShopStore } from "../store/shop.store";

interface MenuItem {
  to: string;
  label: string;
  icon: ReactElement;
}

export const BottomMenu = () => {

  const totalItems = useShopStore((state) => state.totalItems())

  const menuItems: MenuItem[] = [
    {
      to: "/",
      label: "Inicio",
      icon: <IoHomeOutline size={20} />,
    },
    {
      to: "/cart",
      label: "Carrito",
      icon: <CgShoppingCart size={20} />,
    },
    {
      to: "/profile",
      label: "Perfil",
      icon: <FaRegUser size={20} />,
    },
  ]

  return (
    <nav className="w-full flex justify-around items-center text-center mx-auto bottom-0 fixed bg-white">

      <ul className="flex w-full justify-around">
        {
          menuItems.map((item) => (
            <li key={item.to} className="w-full list-none">
              <NavLink to={item.to} className={({ isActive }) => `transition-all ease-in w-full mx-auto flex flex-col items-center justify-center h-full py-2 ${isActive ? 'border-t-2 border-blue-400 text-blue-500' : 'border-t-2 border-gray-200 text-gray-500'}`}>
                <div className={`text-[11px] relative`}>
                  {item.icon}

                  {
                    item.label === 'Carrito' &&
                    <span className="absolute -top-2 -right-3 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      { totalItems }
                    </span>
                  }
                </div>
                <span className="text-[11px]">{item.label}</span>
              </NavLink>
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

