
import { useParams } from "react-router";
import type { NewProduct, Product, ProductFormValues } from "../../interfaces/product";
import { ProductForm } from "../components/products/ProductForm";
import { useProduct } from "../hooks/useProduct";
import { Loading } from "../../components/ui/Loading";


const DEFAULT_NEW_PRODUCT: NewProduct = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  stock: 0,
  category: '',
  images: []
}

export const AdminProductPage = () => {

  const { id } = useParams();
  const productId = id === 'new'? '' : (id || '');

  const { data, isLoading, error } = useProduct(productId);

  if(isLoading) return <Loading />
  if(error) return <p className="text-center text-sm mt-10">{error.response?.data.msg || 'Error al obtener producto.'}</p>

  const title = id === 'new' ? 'Nuevo Producto' : 'Editar Producto';
  const subTitle = id === 'new' ? 'Agrega un nuevo producto' : 'Edita el producto';
  
  const product: NewProduct | Product = productId && data?.product ? data?.product : DEFAULT_NEW_PRODUCT;

  const handleSubmit = (product: ProductFormValues) => {
    console.log('✅ Submit form ✅', product)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProductForm title={title} subTitle={subTitle} product={product} onSubmit={handleSubmit} />
    </div>
  );
};