import { create } from 'zustand'
import { devtools } from 'zustand/middleware';


interface ProductsStore {
  selectedProduct: string | null;
  loading: boolean;
  isProductFiltersOpen: boolean;


  setSelectedProduct: (productId: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  setIsProductFilterOpen: (isOpen: boolean) => void;
}


export const useProductsStore = create<ProductsStore>()(
  devtools((set) => ({
    selectedProduct: null,
    loading:false,
    isProductFiltersOpen: false,


    setSelectedProduct: (productId) => {
      set({selectedProduct: productId}, false, 'products/setSelectedProduct')
    },

    setLoading: (isLoading) => {
      set({loading: isLoading}, false, 'products/setLoading')
    },

    setIsProductFilterOpen: (isOpen) => {
      set({isProductFiltersOpen: isOpen}, false, 'products/setIsProductFiltersOpen')
    }
  }))
)

