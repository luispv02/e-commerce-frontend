

import { clothesFilters } from "../../../data/filters/clothes-filters";
import type { Product } from "../../../interfaces/product";
import { useProductsStore } from "../../store/products.store";

interface Props {
  product: Product;
}

export const ClothingProductVariants = ({ product }: Props) => {

  const productVariant = useProductsStore((state) => state.productVariant)
  const setProductVariant = useProductsStore((state) => state.setProductVariant);

  const productColors = product.category === 'clothes' ? product.colors : []
  const allColors = clothesFilters.find(v => v.filterKey === 'colors')?.options || [];
  const availableColors = allColors.filter(color => productColors.includes(color.id));

  return (
    <>
      {
        product.category === 'clothes' && (
          <div className="pt-4 border-t border-gray-200 space-y-4">
            {
              product.gender && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Género
                  </h3>
                  <div className="flex gap-2">
                    <span className={`px-4 py-1 rounded capitalize  bg-black text-white ${product.stock === 0 ? 'opacity-55' : 'cursor-pointer' }`}>
                      {product.gender === 'men' ? 'Hombre' : product.gender === 'women' ? 'Mujer' : 'Niño'}
                    </span>
                  </div>
                </div>
              )
            }

            {
              product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Tallas
                  </h3>
                  <div className="flex-col">
                    <p className="text-sm">Selecciona una talla</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {
                        product.sizes.map((size) => (
                          <button 
                            key={size} 
                            type="button"
                            disabled={product.stock === 0}
                            className={`border px-3 py-1 rounded text-gray-700 uppercase transition-all text-xs ${size === productVariant.size ? 'bg-black text-white' : 'border-gray-300'} ${product.stock === 0 ? 'opacity-55' : 'cursor-pointer hover:shadow-md' }`} 
                            onClick={() => setProductVariant({...productVariant, size: size})}
                          >
                            {size}
                          </button>
                        ))
                      }
                    </div>
                  </div>
                </div>
              )
            }

            {
              availableColors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Colores
                  </h3>
                  <div className="flex-col flex-wrap">
                    <p className="text-sm">Selecciona un color</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {
                        availableColors.map(color => (
                          <button
                            key={color.id}
                            type="button"
                            disabled={product.stock === 0}
                            onClick={() => setProductVariant({...productVariant, color: color.id})}
                            className={`px-2 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-2 ${product.stock === 0 ? 'opacity-55' : 'cursor-pointer hover:shadow-md' } ${color.id === productVariant.color
                              ? "border shadow-md"
                              : "bg-white text-gray-700 border border-gray-300"
                              }`}
                          >
                            <div className="w-4 h-4 rounded-full border border-gray-200" style={{ backgroundColor: color.hex }} />
                            <span>{color.label}</span>
                          </button>
                        ))
                      }
                    </div>
                  </div>
                </div>
              )
            }
          </div>
        )
      }
    </>
  )
}