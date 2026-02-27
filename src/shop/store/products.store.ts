import { create } from 'zustand'
import { devtools } from 'zustand/middleware';
import type { Product, ProductVariant } from '../../interfaces/product';


interface ProductsStore {
  selectedProduct: Product | null;
  loading: boolean;
  isProductFiltersOpen: boolean;
  isModalOpen: boolean;
  productVariant: ProductVariant,


  setSelectedProduct: (product: Product | null) => void;
  setLoading: (isLoading: boolean) => void;
  setIsProductFilterOpen: (isOpen: boolean) => void;
  setModalOpen: (isOpen: boolean) => void;
  setProductVariant: (variant: ProductVariant) => void;
  resetProductVariant: () => void;
}


export const useProductsStore = create<ProductsStore>()(
  devtools((set) => ({
    selectedProduct: null,
    loading:false,
    isProductFiltersOpen: false,
    isModalOpen: false,
    productVariant: {
      color: null,
      size: null
    },


    setSelectedProduct: (product) => {
      set({selectedProduct: product}, false, 'products/setSelectedProduct')
    },

    setLoading: (isLoading) => {
      set({loading: isLoading}, false, 'products/setLoading')
    },

    setIsProductFilterOpen: (isOpen) => {
      set({isProductFiltersOpen: isOpen}, false, 'products/setIsProductFiltersOpen')
    },

    setModalOpen: (isOpen) => {
      set({ isModalOpen: isOpen }, false, 'products/setModalOpen')
    },

    setProductVariant: (variant) => {
      set({ productVariant: variant }, false, 'products/setProductVariant')
    },

    resetProductVariant: () => {
      set({ productVariant: { color: null, size: null }}, false, 'products/resetProductVariant')
    }
  }))
)

