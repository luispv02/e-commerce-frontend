import { useNavigate } from "react-router";
import type { Product } from "../../../interfaces/product";
import { currencyFormatters } from "../../../utils/currency-formatter";
import { AddToCartButton } from "./AddToCartButton";
import { useAuthStore } from "../../../auth/store/auth.store";
import { useAddToCart } from "../../hooks/cart/useAddToCart";

interface Props {
  product: Product;
  priority?: boolean;
}

export const ProductCard = ({ product, priority }: Props) => {
  const navigate = useNavigate();
  
  const { addProductoToCart, loading } = useAddToCart();
  const role = useAuthStore((state) => state.role);

  const showProductDetails = () => {
    navigate(`/product/${product.id}`);
  }

  const StockBadge = (stock: number) => {
    const color = stock < 3 ? 'bg-red-600' : stock <= 10 ? 'bg-orange-600' : 'bg-green-600';
    return <div className={`text-sm text-white px-2 rounded-full ml-auto ${color}`}>Stock: {stock}</div>
  }

  const optimizedImage = product.images[0].url.replace('/upload/','/upload/f_auto,q_auto,w_400/');

  return (
    <article className="flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg cursor-pointer relative" onClick={showProductDetails}>
      <div className="image relative h-52 w-full">
        {
          product.images[0] && (
            <img 
              src={optimizedImage} alt={product.title} 
              className="h-full w-full object-contain" 
              fetchPriority={priority ? 'high' : 'auto'} 
              loading={priority ? 'eager' : 'lazy'}
            />
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

        {
          role !== 'admin' && <AddToCartButton product={product} onAddProduct={() => addProductoToCart(product)} disabled={product.stock === 0} loading={loading} className="rounded-full py-1" />
        }
       
      </div>
    </article>
  );
};