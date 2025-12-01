import { Outlet } from "react-router";
import { AdminHeader } from "../components/AdminHeader";
import { AdminBottomMenu } from "../components/AdminBottomMenu";
import { AdminSidebar } from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      <aside className="hidden lg:flex fixed top-0 left-0 h-screen w-60 bg-gray-100 border-r border-gray-300 flex-col z-30">
        <AdminSidebar />
      </aside>
      
      <header className="fixed top-0 right-0 left-0 lg:ml-60  shadow-md z-40 bg-white">
        <AdminHeader />
      </header>

      <main className="py-25 lg:ml-60 px-6">
        <Outlet />
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <AdminBottomMenu />
      </div>
    </div>
  );
};

export default AdminLayout;