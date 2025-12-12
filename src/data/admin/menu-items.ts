import { MdOutlineDashboard } from "react-icons/md";
import { CgShoppingCart } from "react-icons/cg";
import type { ComponentType } from "react";

export interface MenuItem {
  to: string;
  label: string;
  icon: ComponentType<{ size?: number }>;
}

export const adminMenuItems: MenuItem[] = [
  { to: "/admin", label: "Dashboard", icon: MdOutlineDashboard },
  { to: "/admin/products", label: "Productos", icon: CgShoppingCart },
];