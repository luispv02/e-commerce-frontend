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

  const StockBadge = (stock: number) => {
    const color = stock < 3 ? 'bg-red-600' : stock <= 10 ? 'bg-orange-600' : 'bg-green-600';
    return <div className={`text-sm text-white px-2 rounded-full ml-auto ${color}`}>Stock: {stock}</div>
  }

  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg cursor-pointer relative" onClick={showProductDetails}>
      <div className="image relative h-52 w-full">
        {
          product.images[0] && (
            <img src={product.images[0].url} alt={product.title} className="h-full w-full object-contain" />
          )
        }
      </div>

      <div className="details flex flex-col gap-3 px-4 py-4">
        <h2 className="text-md font-semibold text-black line-clamp-2 ">
          {product.title}
        </h2>

        {
          product.category === 'clothes' && (
            <div className="text-sm">Tallas: {product.sizes.join(', ')}</div>
          )
        }
        
        {
          product.category === 'technology' && (
            <div className="text-sm">Marca: {product.brand}</div>
          )
        }
        
        { StockBadge(product.stock) }

        <div className="text-xl font-semibold text-gray-800">
          $ {currencyFormatters(product.price)}
        </div>

        <button className="rounded-full bg-slate-900 text-xs py-2 font-semibold  tracking-wide text-white transition hover:bg-slate-700 cursor-pointer px-2" onClick={(e) => handleAddItem(e, product)}>
          Agregar al carrito
        </button>
      </div>
    </article>
  );
};