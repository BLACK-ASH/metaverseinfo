import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set,get) => ({
      cart: [],


      // Add product (increase quantity if exists)
      addProduct: (id, quantity) =>
        set((state) => {
          const existing = state.cart.find((item) => item.id === id);
          if (existing) {
            return {
              cart: state.cart.map((item) => {
                if (item.id === id) {
                  return { ...item, quantity: item.quantity + 1 };
                }
              }),
            };
          } else {
            return {
              cart: [...state.cart, { id, quantity:quantity || 1 }],
            };
          }
        }),

      // Decrease quantity (remove if reaches 0)
      decreaseProduct: (id) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === id
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

        // Increase quantity
        increaseProduct: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        })),

      // Remove product completely
      removeProduct: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      // Clear all products
      clearCart: () => set({ cart: [] }),
      // 🔹 Selector for total items count
      cartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCartStore;
