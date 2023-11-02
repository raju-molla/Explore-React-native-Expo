import { create } from "zustand";
import { Product } from "./interface";

export interface CartState {
  products: Array<Product & { quantity: number }>;
  addProduct: (product: Product) => void;
  removeProduct: (product: Product) => void;
  clearCart: () => void;
  item: number;
}

const useCartStore = create<CartState>((set) => ({
  products: [],
  item: 0,
  addProduct: (product: Product) =>
    set((state) => {
      state.item++;
      const hasProduct = state.products.find((p) => p.id == product.id);
      if (hasProduct) {
        return {
          products: state.products.map((p) => {
            if (p.id === product.id) {
              return { ...p, quantity: p.quantity + 1 };
            }
            return p;
          }),
        };
      } else {
        return {
          products: [...state.products, { ...product, quantity: 1 }],
        };
      }
    }),
  removeProduct: (product: Product) =>
    set((state) => {
      return {
        products: state.products
          .map((p) => {
            if (p.id === product.id) {
              state.item--;
              return { ...p, quantity: p.quantity - 1 };
            }
            return p;
          })
          .filter((p) => p.quantity > 0),
      };
    }),
  clearCart: () =>
    set(() => {
      return {
        item: 0,
        products: [],
      };
    }),
}));

export default useCartStore;
