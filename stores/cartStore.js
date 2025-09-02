import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware'
const useCartStore = create(
    persist(
        (set) => ({
            cart: [],
            addProduct: (id) => set((state) => ({ cart: [...state.cart, id] })),
            removeProduct: (id) => set((state) => ({ cart: state.cart.filter((id) => id !== id) })),
        }),
        {
            name: "cart-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useCartStore;