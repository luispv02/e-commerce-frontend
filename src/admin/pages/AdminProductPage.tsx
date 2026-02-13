
import { useNavigate, useParams } from "react-router";
import type { NewProduct, Product, ProductFormValues } from "../../interfaces/product";
import { ProductForm } from "../components/products/ProductForm";
import { useProduct } from "../hooks/useProduct";
import { Loading } from "../../components/ui/Loading";
import { useProductMutations } from "../hooks/useProductMutations";
import { toast } from "react-toastify";
import { createProductFormData } from "../utils/createProductFormData";


const DEFAULT_NEW_PRODUCT: NewProduct = {
  id: 'new',
  title: '',
  price: 0,
  description: '',
  stock: 0,
  category: '',
  images: [],
  isActive: true
}

export const AdminProductPage = () => {

  const { id } = useParams();
  const isNewProduct = id === 'new';
  const productId = isNewProduct ? '' : (id || '');
  const navigate = useNavigate();

  const { data, isLoading, error } = useProduct(productId);
  const { createUpdateProductMutation } = useProductMutations();

  if(isLoading) return <Loading />
  if(error) return <p className="text-center text-sm mt-10">{error.response?.data.msg || 'Error al obtener producto.'}</p>

  const title = isNewProduct ? 'Nuevo Producto' : 'Editar Producto';
  const subTitle = isNewProduct ? 'Agrega un nuevo producto' : 'Edita el producto';
  
  const product: NewProduct | Product = !isNewProduct && data?.product ? data?.product : DEFAULT_NEW_PRODUCT;

  const handleSubmit = (productData: ProductFormValues) => {
    const formData = createProductFormData(productData);

    createUpdateProductMutation.mutate({ product: formData, productId }, {
      onSuccess: () => {
        toast.success(productId ? 'Producto Actualizado' : 'Producto Creado');
        if(productId){
          navigate(-1)
        }else{
          navigate('/admin/products?page=last');
        }
      }
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProductForm title={title} subTitle={subTitle} product={product} onSubmit={handleSubmit} isPending={createUpdateProductMutation.isPending}/>
    </div>
  );
};