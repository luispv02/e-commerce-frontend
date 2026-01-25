import { MdArrowBackIosNew } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import type { Product } from "../../../interfaces/product";
import { useShopStore } from "../../store/shop.store";
import { currencyFormatters } from "../../../utils/currency-formatter";
import { useState } from "react";
import { useAuthStore } from "../../../auth/store/auth.store";

export const ProductDetails = () => {

  const addItem = useShopStore((state) => state.addItem);
  const isAuth = useAuthStore((state) => state.isAuthenticated);
  const setSelectedProduct = useShopStore((state) => state.setSelectedProduct)
  const navigate = useNavigate();

  const product: Product = {
    id: "1",
    title: "Playera muy moderna",
    price: 100,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate ipsum ut augue pulvinar tincidunt.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=70",
        _id: "1"
      },
      {
        url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=70",
        _id: "2"
      },
      {
        url: "https://plus.unsplash.com/premium_photo-1764601209257-593473bf212e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8",
        _id: "3"
      },
      {
        url: "https://images.unsplash.com/photo-1764708844823-00d2188dafd8?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        _id: "4"
      }
    ],
    stock: 1,
    category: "clothes",
    sizes: ["m", "l"],
    gender: "men",
    colors: ["white"],
    type: "t-shirts"
  };

  const { images, title, price, description } = product;
  const [selectedProductImg, setSelectedProductImg] = useState(images[0].url);

  const handleAddItem = () => {
    if(!isAuth){
      setSelectedProduct(product)
      navigate('/auth/login');
      return;
    }
    addItem(product)
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:px-10">
      <Link to="/" className="mb-6 cursor-pointer block">
        <MdArrowBackIosNew className="w-5 h-5" />
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">

        <div className="w-full">
          <div className="h-96 w-full overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
            <img
              src={selectedProductImg}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {
            images.length > 0 &&
            <div className="grid grid-cols-4 gap-2 mt-4">
              {
                images.map((img, i) => (
                  <div key={i} className={`overflow-hidden rounded-lg cursor-pointer border hover:border-gray-400 ${selectedProductImg === img.url ? "border-blue-500" : "border-gray-200"}`} onClick={() => setSelectedProductImg(img.url)}>
                    <img src={img.url} alt={img.url} className="h-full w-full object-cover"/>
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
              className="w-full py-4 px-6 rounded-xl font-semibold sm:text-lg transition-all cursor-pointer bg-gray-900 text-white hover:bg-gray-700 shadow-lg" onClick={handleAddItem}>
              Agregar al Carrito
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};