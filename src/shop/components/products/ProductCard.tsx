import { useNavigate } from "react-router";
import type { Product } from "../../../interfaces/product";
import { useShopStore } from "../../store/shop.store";
import type { MouseEvent } from "react";
import { currencyFormatters } from "../../../utils/currency-formatter";
import { useAuthStore } from "../../../auth/store/auth.store";

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();
  const addItem = useShopStore((state) => state.addItem)
  const isAuth = useAuthStore((state) => state.isAuthenticated)
  const setSelectedProduct = useShopStore((state) => state.setSelectedProduct)


  const showProductDetails = () => {
    navigate(`/product/${product.id}`);
  }

  const handleAddItem = (e: MouseEvent<HTMLButtonElement>, product: Product) => {
    e.stopPropagation();

    if(!isAuth){
      setSelectedProduct(product)
      navigate('/auth/login');
      return;
    }
    addItem(product);
  }


  return (
    <article className="overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg cursor-pointer relative" onClick={showProductDetails}>
      <div className="relative h-52 w-full">
        {product.images.length && <img key={product.id} src={product.images[0]} alt={product.title} className="h-full w-full object-cover" />}
      </div>

      <div className="flex flex-col gap-3 px-4 py-4">
        <h2 className="text-sm font-semibold text-gray-700">
          {product.title}
        </h2>

        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-800">
            $ {currencyFormatters(product.price)}
          </span>

          <button className="rounded-full bg-slate-900 text-xs py-1  font-semibold  tracking-wide text-white transition hover:bg-slate-700 cursor-pointer px-2" onClick={(e) => handleAddItem(e, product)}>
            Agregar al carrito
          </button>
        </div>
      </div>
    </article>
  );
};