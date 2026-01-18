
import { Carousel } from "../components/layout/Carousel";
import { Categories } from "../components/layout/Categories";
import { Filters } from "../components/filters/Filters";
import { Products } from "../components/products/Products";

export const HomePage = () => {


  return (
    <div className="space-y-10">
      <Categories />

      <Carousel />

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <Filters />
        </div>

        <div className="flex-3">
          <Products />
        </div>
      </div>
    </div>
  );
};