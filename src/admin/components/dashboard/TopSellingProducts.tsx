import { Link } from "react-router";
import type { TopProduct } from "../../interface/dashboard";
import { currencyFormatters } from "../../../utils/currency-formatter";

interface Props {
  topProducts: TopProduct[];
}

export const TopSellingProducts = ({ topProducts }: Props) => {

  return (
    <ul className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
      {topProducts.map((product) => (
        <li
          key={product.id}
          className="flex gap-2 sm:gap-3 items-start sm:items-center p-3 sm:p-3.5 hover:bg-gray-50/80"
        >

          <div className="h-12 w-12 rounded-md border border-gray-200 bg-gray-100 overflow-hidden shrink-0">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-gray-300 text-xs">
                —
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <Link
              to={`/product/${product.id}`}
              target="_blank"
              className="text-sm font-medium text-black hover:underline line-clamp-2"
            >
              {product.name}
            </Link>
            <p className="text-xs text-gray-500 mt-0.5">
              <span className="text-gray-700 font-medium">
                ${currencyFormatters(product.revenue)} generados
              </span>
              
              <span className="text-gray-400 mx-1">·</span>

              <span className="tabular-nums text-green-600 font-medium">
                {product.percentage}%
              </span>
              <span className="text-gray-500"> del total</span>
              
              <span className="text-gray-400 mx-1">·</span>
              <span>{ product.units } { product.units === 1 ? 'Venta' : 'Ventas' }</span>

            </p>
          </div>
        </li>
      ))}
    </ul>
  );
};
