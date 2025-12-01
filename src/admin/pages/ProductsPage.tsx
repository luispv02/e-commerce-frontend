import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router";
import type { Product } from "../../interfaces/product";

export const ProductsPage = () => {

  const products: Product[] = [
    {
      id: "1",
      title: "Auriculares Pro X",
      price: 299.99,
      description: "Audio premium",
      stock: 45,
      category: "technology",
      images: ["https://placeholder.pagebee.io/api/random/300/200"]
    },
    {
      id: "2",
      title: "Camisa Oversize",
      price: 49.99,
      description: "Camisa cómoda",
      stock: 120,
      category: "clothes",
      images: ["https://placeholder.pagebee.io/api/random/300/200"]
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between">
        <div>
          <h2 className="text-gray-600 text-md">Products</h2>
          <p className="text-gray-500 text-sm">Gestiona tus productos</p>
        </div>
        <Link to='/admin/products/new'>
          <button className="bg-cyan-200 p-1 rounded border border-cyan-300 hover:bg-cyan-300 transition cursor-pointer">
            <FiPlus className="text-xl text-cyan-700" />
          </button>
        </Link>
      </div>

      {/* Tabla de productos */}
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
                  <img src={producto.images[0]} alt={`Producto ${producto.id}`} className="w-12 h-12 object-cover rounded" />
                </td>

                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
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
                  ${producto.price.toFixed(2)}
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
    </div >
  );
};