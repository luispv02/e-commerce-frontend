import { useNavigate } from "react-router";
import { currencyFormatters } from "../../../utils/currency-formatter"
import { FaMinus, FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Loading } from "../../../components/ui/Loading";
import type { CartItem as CartItemType, UpdateCartItemDTO } from "../../interface/cart";
import { getColorLabel } from "../../../utils/get-color-label";
import { useMemo } from "react";

interface Props {
  item: CartItemType;
  onUpdateQuantity: ({cartItemId, quantity}:UpdateCartItemDTO) => void;
  onDeleteItem: (productId: string) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export const CartItem = ({item, onUpdateQuantity, onDeleteItem, isUpdating, isDeleting}: Props) => {
  const navigate = useNavigate();

  const getColor = useMemo(() => {
    const color = item.variants?.color;
    return color ? getColorLabel(color) : undefined
  }, [item.variants?.color])
  
  return (
     <article className="border-b relative border-gray-400 flex flex-col items-end lg:flex-row lg:items-end py-4">
      
        { isDeleting && <div className="bg-white/70 absolute inset-0 flex justify-center items-center"><Loading message=""/></div>}
        { !item.product.isActive && 
          <div className="bg-white/70 absolute inset-0 ">
            <p className="text-red-500 text-xs">Producto no disponible</p>
          </div> 
        }

        <div className="w-full flex gap-4">
          {/* Image */}
          <div className="image cursor-pointer shrink-0" onClick={() => navigate(`/product/${item.product.id}`)}>
            <img
              src={item.product.images[0].url}
              alt={item.product.title}
              className="w-30 md:w-30 h-32 object-contain"
            />
          </div>

          <div className="flex justify-between flex-col w-full space-y-4">
            {/* Title - price */}
            <div className="space-y-0.5">
              <h4 className="text-sm md:text-lg line-clamp-2 mb-2 font-medium ">{item.product.title}</h4>
              <p className="text-xs lg:text-sm">Precio unidad: <span className="font-bold">${currencyFormatters(item.product.price)}</span></p>
              <p className="text-xs lg:text-sm">Subtotal: <span className="font-bold">${currencyFormatters(item.product.price * item.quantity)}</span></p>

              {
                item.variants?.color && item.variants.size && 
                <div className="flex gap-2">
                  <p className="text-xs lg:text-sm">Color: <span className="font-bold capitalize">{getColor}</span></p>
                  <p className="text-xs lg:text-sm">Talla: <span className="font-bold uppercase">{item.variants.size}</span></p>
                </div>
              }
            </div>

            {/* buttons actions */}
            <div className="flex ml-auto gap-2">
              <div className="w-21 h-8 flex justify-around items-center bg-gray-200 rounded-full">
                <button
                  className={`text-gray-600 ${item.quantity <= 1 || isUpdating ? 'opacity-25' : 'cursor-pointer'}`}
                  aria-label="Disminuir cantidad"
                  onClick={() => onUpdateQuantity({ cartItemId: item.id, quantity: item.quantity - 1 })}
                  disabled={item.quantity <= 1 || isUpdating}
                >
                  <FaMinus size={12} color="black"/>
                </button>

                { isUpdating ? <Loading message="" width="w-4" height="h-4" spinMargin="my-0" borderStyle="border-t-gray-600" /> : <span className="text-center text-sm">{item.quantity}</span> }

                <button
                  className={`text-gray-600 ${item.stockAvailable === 0 || isUpdating ? 'opacity-25' : 'cursor-pointer'}`}
                  aria-label="Aumentar cantidad"
                  onClick={() => onUpdateQuantity({ cartItemId: item.id, quantity: item.quantity + 1 })}
                  disabled={item.stockAvailable === 0 || isUpdating}
                >
                  <FaPlus size={12} color="black"/>
                </button>
              </div>

              <button
                className={`z-10 ${isUpdating || isDeleting ? 'opacity-50' : 'cursor-pointer'}`}
                aria-label="Eliminar producto"
                onClick={() => onDeleteItem(item.id)}
                disabled={isUpdating || isDeleting}
              >
                <MdDeleteOutline className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </article>
  )
}
