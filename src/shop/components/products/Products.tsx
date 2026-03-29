
import { ProductList } from "./ProductList";
import { Pagination } from "../../../components/shared/Pagination";
import { Loading } from "../../../components/ui/Loading";
import type { UseQueryResult } from "@tanstack/react-query";
import type { ApiError, ProductsResponse } from "../../../interfaces/product";
import type { AxiosError } from "axios";
import { useProductsStore } from "../../store/products.store";
import { Modal } from "../../../components/ui/Modal";
import { ClothingProductVariants } from "./ClothingProductVariants";
import { AddToCartButton } from "./AddToCartButton";
import { useAddToCart } from "../../hooks/cart/useAddToCart";

interface Props {
  productsQuery: UseQueryResult<ProductsResponse, AxiosError<ApiError>> 
  category: string;
}

export const Products = ({productsQuery, category}: Props) => {

  const { addProductoToCart, loading } = useAddToCart();

  const isModalOpen = useProductsStore((state) => state.isModalOpen)
  const setModalOpen = useProductsStore((state) => state.setModalOpen)
  const selectedProduct = useProductsStore((state) => state.selectedProduct)
  const productVariant = useProductsStore((state) => state.productVariant)
  const resetProductVariant = useProductsStore((state) => state.resetProductVariant)
  const setSelectedProduct = useProductsStore((state) => state.setSelectedProduct)

  if(productsQuery.isLoading) return <Loading message="Cargando productos..." />
  if(!productsQuery.data || productsQuery.data.data.products.length === 0) return <p className="text-center text-sm">No se encontraron productos</p>
  
  const { products, pagination } = productsQuery.data.data;

  const getNameProducts = (category: string) => {
    const categoryNames: Record<string, string> = {
      clothes: 'Productos de ropa',
      technology: 'Productos de tecnología',
      others: 'Otros productos',
    }

    return categoryNames[category] || 'Todos los productos';
  }
  const handleHiddenModal = () => {
    resetProductVariant();
    setSelectedProduct(null)
    setModalOpen(false)
  }

  return (
    <section className="px-4">
      <header className="mb-6 flex flex-col gap-2">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="text-lg lg:text-3xl font-semibold text-slate-900">
            { getNameProducts(category) }: {pagination.totalProducts}
          </h2>
        </div>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ProductList products={products} />
      </div>
      <div>
        <Pagination totalPages={pagination.totalPages}/> 
      </div>

      {
        selectedProduct &&
        <Modal title="Selecciona las variantes del producto" isOpen={isModalOpen} onClose={handleHiddenModal}>
          <div className="space-y-6">
            <p className="mb-2 text-sm">Producto: {selectedProduct.title}</p>
            <ClothingProductVariants product={selectedProduct} />
            <AddToCartButton product={selectedProduct} onAddProduct={() => addProductoToCart(selectedProduct)} disabled={!productVariant.color || !productVariant.size} loading={loading} className="py-1 rounded-sm"/>
          </div>
        </Modal>
      }
      
    </section>
  );
};