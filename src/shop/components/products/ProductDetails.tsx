import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { currencyFormatters } from "../../../utils/currency-formatter";
import { useProduct } from "../../hooks/products/useProduct";
import { Loading } from "../../../components/ui/Loading";
import { AddToCartButton } from "./AddToCartButton";
import { ProductImageCarousel } from "./ProductImageCarousel";
import { ClothingProductVariants } from "./ClothingProductVariants";
import { useProductsStore } from "../../store/products.store";
import { useAuthStore } from "../../../auth/store/auth.store";
import { useAddToCart } from "../../hooks/cart/useAddToCart";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addProductoToCart, loading } = useAddToCart();
  const productVariant = useProductsStore((state) => state.productVariant);
  const resetProductVariant = useProductsStore((state) => state.resetProductVariant);

  const role = useAuthStore((state) => state.role);
  
  const { data, isLoading, error } = useProduct(id || "");

  if(isLoading) return <Loading spinMargin="my-6"/>
  if(error || !data) return <p className="text-center text-sm mt-10">{ error?.response?.data.msg || 'Error al obtener producto.' }</p>

  const product = data.product;
  const { images, title, price, description, stock, category } = product;

  const btnDisabled = stock === 0 || category === 'clothes' && (!productVariant.size || !productVariant.color);
  
  const handleGoBack = () => {
    resetProductVariant()
    navigate(-1);
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:px-10">
      <button aria-label="Volver atrás" onClick={handleGoBack} className="mb-6 cursor-pointer block">
        <MdArrowBackIosNew className="w-5 h-5" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20">
        { images.length > 0 && <ProductImageCarousel images={images} /> }

        <div className="flex flex-col justify-start">
          <div className="space-y-6">

            <div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                {title}
              </h2>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                $ {currencyFormatters(price)}
              </span>
              <span className={`text-lg font-semibold ${stock < 3 ? 'text-red-600' : stock <= 10 ? 'text-orange-600' : 'text-green-600'}`}>
                {stock > 0 ? `Stock disponible: ${stock}` : 'Sin stock'}
              </span>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">
                Descripción
              </h2>
              <p className="text-gray-600 text-base sm:text-lg whitespace-pre-line">
                {description}
              </p>
            </div>
            
            <ClothingProductVariants product={product} />

            {
              category === 'technology' && (
                <div className="pt-4 border-t border-gray-200">
                  { product.brand && (
                    <>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Marca
                      </h3>
                      <p className="text-gray-600 text-base sm:text-lg">
                        { product.brand }
                      </p>
                    </>
                  ) }
                </div>
              )
            }
          </div>

          {
            role !== 'admin' && 
            <div className="mt-8">
              <AddToCartButton product={product} onAddProduct={() => addProductoToCart(product)} disabled={btnDisabled} loading={loading} className="rounded-md py-3"/>
            </div>
          }
        </div>
      </div>
    </div>
  );
};