import { BiDollar } from "react-icons/bi";
import { useFiltersGeneral } from "../../hooks/useFiltersGeneral";
import { FaArrowRight } from "react-icons/fa";

export const FiltersGeneral = () => {

  const { currentOrderBy, prices, handleOrderChange, handleChangePrices, handlePrices } = useFiltersGeneral();

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-xl">Filtros</h1>

      <div className="sort">
        <span className="text-gray-700 text-sm mb-2 block">Ordenar por</span>
        <div>
          <select className="w-full border border-gray-300 rounded-full py-1 px-2 text-sm outline-0 focus:border-gray-500 text-gray-500 bg-white" onChange={handleOrderChange} value={currentOrderBy}>
            <option value="any">Por defecto</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="newest">Más recientes</option>
            <option value="oldest">Más antiguos</option>
          </select>
        </div>
      </div>


      <div className="price">
        <span className="text-gray-700 text-sm mb-2 block">Rango de precio</span>
        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            <div className="flex items-center border border-gray-300 rounded-full py-1 px-2 gap-1 focus-within:border-gray-500">
              <BiDollar className="text-gray-500" />
              <input type="number" name="min" placeholder="min" onChange={handleChangePrices} value={prices.min} className="w-full text-sm outline-0 text-gray-500" />
            </div>

            <div className="flex items-center border border-gray-300 rounded-full py-1 px-2 gap-1 focus-within:border-gray-500">
              <BiDollar className="text-gray-500" />
              <input type="number" name="max" placeholder="max" onChange={handleChangePrices} value={prices.max} className="w-full text-sm outline-0 text-gray-500" />
            </div>
          </div>

          <button className="cursor-pointer text-gray-900" onClick={handlePrices}>
            <FaArrowRight/>
          </button>
          
        </div>
      </div>


    </div>
  );
};
