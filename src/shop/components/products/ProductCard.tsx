import { useNavigate } from "react-router";
import type { Product } from "../../../interfaces/product";
import { currencyFormatters } from "../../../utils/currency-formatter";
import { AddToCartButton } from "./AddToCartButton";

interface Props {
  product: Product
}

export const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  const showProductDetails = () => {
    navigate(`/product/${product.id}`);
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

        <AddToCartButton product={product} className="rounded-full text-xs py-2 tracking-wide"/>
      </div>
    </article>
  );
};