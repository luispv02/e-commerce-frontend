import { FiPlus } from "react-icons/fi";
import { Link } from "react-router";
import { useProducts } from "../hooks/useProducts";
import { Loading } from "../../components/ui/Loading";
import { ProductsTable } from "../components/products/ProductsTable";
import { useProductsFilters } from "../../shop/hooks/products/useProductsFilters";

export const ProductsPage = () => {

  const { filters } = useProductsFilters()
  const { data, isLoading, error } = useProducts(filters);

  if(isLoading) return <Loading />;
  if(error) return <p className="text-center text-sm mt-10">{error.response?.data.msg || 'Error al obtener productos.'}</p>
  if(!data?.data?.products) return <p className="text-center text-sm mt-10">No se encontraron productos.</p>

  const {products, pagination} = data.data;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-gray-600 text-lg font-bold">Productos</h2>
          <p className="text-gray-500 text-sm">Gestiona tus productos</p>
        </div>
        <Link to='/admin/products/new' className="bg-cyan-200 p-1 rounded border border-cyan-300 hover:bg-cyan-300 transition cursor-pointer">
          <FiPlus className="text-xl text-cyan-700" />
        </Link>
      </div>

      {
        products.length > 0
        ? ( <ProductsTable products={products} pagination={pagination} /> )
        : ( <div className="text-sm text-center mt-10 flex flex-col items-center">
              <p>Aun no se han agregado productos.</p>
              <p>Comienza agregando tu primer producto.</p>
              <Link to='/admin/products/new' className="bg-black text-white p-2 rounded mt-4">
                <FiPlus size={20} />
              </Link>
            </div>
          )
      }
    </div >
  );
};