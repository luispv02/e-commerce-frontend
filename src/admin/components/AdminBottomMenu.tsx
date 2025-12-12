import { NavLink } from "react-router";
import { adminMenuItems } from "../../data/admin/menu-items";


export const AdminBottomMenu = () => {

  return (
    <nav className="bg-white">
      <ul className="flex w-full justify-around">
        {adminMenuItems.map(item => (
          <li key={item.to} className="list-none w-full">
            <NavLink
              to={item.to}
              end
              className={({ isActive }) => `flex flex-col items-center py-2 transition ${isActive ? "border-t-2 border-blue-500 text-blue-500 font-semibold" : "text-gray-500  border-t-2 border-gray-200"}`} >
              <item.icon size={20} />
              <span className="text-[11px]">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
