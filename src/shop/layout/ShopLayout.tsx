import { Outlet } from "react-router";
import { Header } from "../components/layout/Header";
import { BottomMenu } from "../components/layout/BottomMenu";

const ShopLayout = () => {
  return (
    <div className="pb-20">
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto ">
          <Header />
        </div>
      </div>

      <div className="max-w-5xl m-auto pt-6 px-4">
        <main>
          <Outlet />
        </main>
      </div>

      <div className="md:hidden">
        <BottomMenu />
      </div>
    </div>
  );
};

export default ShopLayout;