import { MdArrowBackIosNew } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { useShopStore } from "../../store/shop.store";
import { currencyFormatters } from "../../../utils/currency-formatter";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../../auth/store/auth.store";
import { useProduct } from "../../hooks/useProduct";
import { Loading } from "../../../components/ui/Loading";
import { useProductsStore } from "../../store/products.store";

export const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const addItem = useShopStore((state) => state.addItem);
  const setSelectedProduct = useProductsStore((state) => state.setSelectedProduct)
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  
  const { data, isLoading, error } = useProduct(id || "");

  const [selectedProductImg, setSelectedProductImg] = useState<string | null>(null);

  useEffect(() => {
    if(data?.product && data.product.images.length > 0){
      setSelectedProductImg(data.product.images[0].url);
    }
  }, [data])

  if(isLoading) return <Loading borderColor="black" textColor="black"/>
  if(error || !data) return <p className="text-center text-sm mt-10">{ error?.response?.data.msg || 'Error al obtener producto.' }</p>

  const product = data.product;
  const { images, title, price, description, stock, category } = product;

  const handleAddItem = () => {
    if(!isAuth){
      setSelectedProduct(product)
      navigate('/auth/login', { state: { from: location.pathname }});
      return;
    }
    addItem(product)
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:px-10">
      <button onClick={() => navigate(-1)} className="mb-6 cursor-pointer block">
        <MdArrowBackIosNew className="w-5 h-5" />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20">
        <div className="w-full">
          <div className="h-96 w-full">
            <img
              src={selectedProductImg ?? 'https://placehold.co/600x400'}
              alt={title}
              className="h-full w-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {
            images.length > 0 &&
            <div className="grid grid-cols-4 gap-2 mt-4">
              {
                images.map((img) => (
                  <div key={img._id} className={`overflow-hidden rounded-lg cursor-pointer border hover:border-gray-400 ${selectedProductImg === img.url ? "border-blue-500" : "border-gray-200"}`} onClick={() => setSelectedProductImg(img.url)}>
                    <img src={img.url} alt={img.url} className="h-full w-full object-contain"/>
                  </div>
                ))
              }
            </div>
          }
        </div>

        <div className="flex flex-col justify-between">
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
              <p className="text-gray-600 text-base sm:text-lg">
                {description}
              </p>
            </div>
            
            {
              category === 'clothes' && (
                <div className="pt-4 border-t border-gray-200 space-y-4">
                  {
                    product.gender && (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Género
                        </h3>
                        <div className="flex gap-2">
                          <span className="border border-gray-400 px-4 py-1 rounded capitalize text-gray-700">
                            {product.gender === 'men' ? 'Hombre' : product.gender === 'women' ? 'Mujer' : 'Niño'}
                          </span>
                        </div>
                      </>
                    )
                  }

                  {
                    product.sizes && product.sizes.length > 0 && (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Tallas
                        </h3>
                        <div className="flex gap-2">
                          {
                            product.sizes.map((size) => (
                              <span key={size} className="border border-gray-400 px-4 py-1 rounded capitalize text-gray-700">{size}</span>
                            ))
                          }
                        </div>
                      </>
                    )
                  }

                  {
                    product.colors && product.colors.length > 0 && (
                      <>
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Colores
                        </h3>
                        <div className="flex gap-2">
                          {
                            product.colors.map((color) => (
                              <span key={color} className="border border-gray-400 px-4 py-1 rounded capitalize text-gray-700">{color}</span>
                            ))
                          }
                        </div>
                      </>
                    )
                  }
                </div>
              )
            }

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

          <div className="pt-6 mt-8">
            <button
              disabled={stock === 0}
              className={`w-full py-4 px-6 rounded-xl font-semibold sm:text-lg transition-all bg-gray-900 text-white shadow-lg ${stock === 0 ? 'opacity-50' : 'cursor-pointer hover:bg-gray-700'}`} onClick={handleAddItem}>
              {stock === 0 ? 'Producto sin stock' : 'Agregar al Carrito'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};