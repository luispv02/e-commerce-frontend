import { create } from 'zustand'
import { devtools } from 'zustand/middleware';
import type { Product } from '../../interfaces/product';


interface ProductsStore {
  selectedProduct: Product | null;
  loading: boolean;

  setSelectedProduct: (product: Product | null) => void;
  setLoading: (isLoading: boolean) => void;
}


export const useProductsStore = create<ProductsStore>()(
  devtools((set) => ({
    selectedProduct: null,
    loading:false,


    setSelectedProduct: (product) => {
      set({selectedProduct: product}, false, 'products/setSelectedProduct')
    },

    setLoading: (isLoading) => {
      set({loading: isLoading}, false, 'products/setLoading')
    },
  }))
)

