
import { useParams } from "react-router";
import type { NewProduct, ProductFormValues } from "../../interfaces/product";
import { ProductForm } from "../components/products/ProductForm";

export const AdminProductPage = () => {

  const { id } = useParams();

  const title = id === 'new' ? 'Nuevo Producto' : 'Editar Producto';
  const subTitle = id === 'new' ? 'Agrega un nuevo producto' : 'Edita el producto';

  const product: NewProduct = {
    id: 'new',
    title: '',
    price: 0,
    description: '',
    stock: 0,
    category: '',
    images: []
  }

  // const product: Product = {
  //   id: '1',
  //   title: 'Jeans azulES',
  //   price: 100,
  //   description: 'Pantalones Azules',
  //   stock: 10,
  //   category: 'clothes',
  //   images: ["https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=70", "https://cdn.pixabay.com/photo/2023/11/13/18/01/fall-8386067_1280.jpg", "https://cdn.pixabay.com/photo/2025/11/04/20/08/marriage-9937156_640.jpg"],
  //   sizes: ['xs', 'xxl'],
  //   gender: 'kid',
  //   colors: ['white', 'pink'],
  //   type: 'pants',
  // }

  const handleSubmit = (product: ProductFormValues) => {
    console.log('✅ Submit form ✅', product)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <ProductForm title={title} subTitle={subTitle} product={product} onSubmit={handleSubmit} />
    </div>
  );
};