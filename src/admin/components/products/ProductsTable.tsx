import { Link } from "react-router";
import type { Pagination as PaginationType, Product } from "../../../interfaces/product"
import { currencyFormatters } from "../../../utils/currency-formatter";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Pagination } from "../../../components/shared/Pagination";


interface Props {
  products: Product[];
  pagination: PaginationType;
}

export const ProductsTable = ({ products, pagination }: Props) => {

  return (
    <>
      <div className="mt-6 overflow-x-auto border border-gray-200 shadow-lg">
        <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
          <thead>
            <tr className="bg-white border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Imagen
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Nombre
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Categoría
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Stock
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Precio
              </th>
              <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wide">
                Acción
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {products.map((producto) => (
              <tr key={producto.id} className="hover:bg-gray-50 transition-colors">

                <td className="px-4 py-3 whitespace-nowrap">
                  <img src={producto.images[0].url} alt={`Producto ${producto.id}`} className="w-12 h-12 object-cover rounded" />
                </td>

                <td className="px-4 py-3 text-sm text-gray-900">
                  {producto.title}
                </td>

                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {producto.category}
                </td>

                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium 
                    ${producto.stock > 50
                      ? "bg-green-100 text-green-800"
                      : producto.stock > 20
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {producto.stock} unidades
                  </span>
                </td>

                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                  ${currencyFormatters(producto.price)}
                </td>

                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/products/${producto.id}`}>
                      <button className="cursor-pointer p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Editar">
                        <FiEdit2 className="w-4 h-4" />
                      </button></Link>

                    <button className="cursor-pointer p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Eliminar">
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalPages={pagination.totalPages}/>
    </>
  )
}

