import { create } from 'zustand'
import type { CartItem } from '../../interfaces/cart';
import { devtools } from 'zustand/middleware';
import type { Product } from '../../interfaces/product';


interface CartStore {
  items: CartItem[];

  // getters
  totalItems: () => number;
  totalPrice: () => number;

  // actions
  addItem: (product: Product) => void;
  deleteItem: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
}


export const useShopStore = create<CartStore>()(
  devtools((set, get) => ({
    items: [],
    selectedProduct: null,

    totalItems: () => {
      return get().items.reduce((acc, item) => item.quantity + acc, 0);
    },
    totalPrice: () => {
      return get().items.reduce((acc, item) => (item.product.price * item.quantity) + acc, 0);
    },
    

    addItem: (product) => set((state) => {
      const itemExists = state.items.some(item => item.product.id === product.id);
      if (itemExists){
        return {
          items: state.items.map(item => item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1  }
            : item
          )
        }
      }

      return {
        items: [...state.items, { product, quantity: 1 }]
      }
    }, false, 'cart/addItem'),
    deleteItem: (id) => set((state) => {
      return {
        items: state.items.filter(item => item.product.id !== id)
      }
    }, false, 'cart/deleteItem'),
    increaseQty: (id) => set((state) => {
      return {
        items: state.items.map(item => item.product.id === id
          ? { ...item, quantity: item.quantity + 1 }  
          : item
        )
      }
    }, false, 'cart/increaseQty'),
    decreaseQty: (id) => set((state) => {
      const productFound = state.items.find(item => item.product.id === id);
      if(productFound && productFound.quantity === 1){
        return {
          items: state.items.filter(item => item.product.id !== id)
        }
      }

      return {
        items: state.items.map(item => item.product.id === id
          ? { ...item, quantity: item.quantity - 1 }  
          : item
        )
      }
    }, false, 'cart/decreaseQty')
  }))
)

