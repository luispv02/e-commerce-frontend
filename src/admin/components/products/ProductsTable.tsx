import { Link } from "react-router";
import type { Pagination as PaginationType, Product } from "../../../interfaces/product"
import { currencyFormatters } from "../../../utils/currency-formatter";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Pagination } from "../../../components/shared/Pagination";
import { useProductMutations } from "../../hooks/useProductMutations";
import { Modal } from "../../../components/ui/Modal";
import { useState } from "react";
import { Loading } from "../../../components/ui/Loading";
import { ToggleActiveProduct } from "./ToggleActiveProduct";


interface Props {
  products: Product[];
  pagination: PaginationType;
}

export const ProductsTable = ({ products, pagination }: Props) => {

  const { deleteProductMutation } = useProductMutations();
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
  }

  const handleDelete = () => {
    if(!productToDelete?.id) return;
    
    deleteProductMutation.mutate(productToDelete.id, {
      onSuccess: () => {
        setProductToDelete(null)
      }
    })
  }

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
                Activo
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
                  <img src={producto.images[0].url ?? "/placeholder.png"} alt={`Producto ${producto.id}`} className="w-12 h-12 object-contain rounded" />
                </td>

                <td className="px-4 py-3 whitespace-nowrap lg:whitespace-normal text-sm text-gray-900">
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
                  <ToggleActiveProduct product={producto} />
                </td>

                <td className="px-4 py-3 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-2">
                    <Link to={`/admin/products/${producto.id}`} className="cursor-pointer p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      <FiEdit2 className="w-4 h-4" />
                    </Link>

                    <button className="cursor-pointer p-2 text-red-600 hover:bg-red-50 rounded transition-colors" title="Eliminar" onClick={() => handleDeleteClick(producto)}>
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal title="¿Quieres eliminar este producto?" isOpen={!!productToDelete} onClose={() => setProductToDelete(null)}>
        <div className="">
          <p className="text-center text-sm">{productToDelete?.title}</p>
          <p className="text-xs text-center">{productToDelete?.id}</p>

          {
            deleteProductMutation.isPending 
            ? <Loading message="Eliminando producto..." width="w-6" height="h-6" spinMargin="my-4"/>
            : <div className="flex justify-center gap-3 mt-8">
                <button className="bg-red-500 text-white  border-red-600 border text-sm py-1 px-2 rounded cursor-pointer hover:bg-red-600 hover:text-white transition" onClick={handleDelete}>Eliminar</button>
                <button className="border text-sm py-1 px-2 rounded cursor-pointer hover:bg-black hover:text-white transition" onClick={() => setProductToDelete(null)}>Cancelar</button>
              </div>
          }
        </div>
      </Modal>

      <Pagination totalPages={pagination.totalPages} />
    </>
  )
}

