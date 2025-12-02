import { MdArrowBackIosNew } from "react-icons/md";
import { Link } from "react-router";
import type { Product } from "../../../interfaces/product";
import { useShopStore } from "../../store/shop.store";
import { currencyFormatters } from "../../../utils/currency-formatter";

export const ProductDetails = () => {

  const addItem = useShopStore((state) => state.addItem)

  const product: Product = {
    id: "1",
    title: "Playera muy moderna",
    price: 100,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=70", "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=70"],
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate ipsum ut augue pulvinar tincidunt.",
    stock: 1,
    category: "clothes"
  };

  const { images, title, price, description } = product;


  return (
    <div className="max-w-7xl mx-auto p-4 md:px-10">
      <Link to="/" className="mb-6 cursor-pointer block">
        <MdArrowBackIosNew className="w-5 h-5" />
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">

        <div className="w-full">
          <div className="w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
            <img
              src={images[0]}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {
            images.length > 0 &&
            <div className="grid grid-cols-4 gap-2 mt-4">
              {
                images.map((img, i) => (
                  <div key={i} className="overflow-hidden rounded-lg border border-gray-200 cursor-pointer hover:border-gray-400">
                    <img src={img} alt={img} className="h-full w-full object-cover"/>
                  </div>
                ))
              }
            </div>
          }
        </div>

        <div className="flex flex-col justify-between">
          <div className="space-y-6">

            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                {title}
              </h2>
            </div>

            <div className="flex">
              <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                $ {currencyFormatters(price)}
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
          </div>

          <div className="pt-6 mt-8">
            <button
              className="w-full py-4 px-6 rounded-xl font-semibold sm:text-lg transition-all cursor-pointer bg-gray-900 text-white hover:bg-gray-700 shadow-lg" onClick={() => addItem(product)}>
              Agregar al Carrito
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};