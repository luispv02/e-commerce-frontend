import type { Product } from '../../../interfaces/product';

interface Props {
  product: Product;
  onAddProduct: () => void;
  disabled: boolean;
  loading?: boolean;
  className?: string;
}

export const AddToCartButton = ({product, onAddProduct, disabled, loading, className = ""}: Props) => {

  const isDisabled = disabled || loading;

  return (
    <button 
      type="button"
      disabled={isDisabled}
      className={`w-full bg-slate-900 font-semibold text-white transition flex flex-col items-center ${isDisabled ? 'opacity-50' : 'cursor-pointer hover:bg-gray-700'} ${className}`} 
      onClick={(e) => {
        e.stopPropagation();
        onAddProduct()
      }}
    >
      
      { 
        loading 
        ? <div data-testid="spinner" className="w-4 h-4 border border-transparent border-t-white rounded-full animate-spin my-1"></div>
        : <span> {product.stock === 0 ? 'Producto sin stock' : 'Agregar al Carrito'} </span>
      }
      
    </button>
  )
}
