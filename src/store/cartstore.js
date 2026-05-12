import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set) => ({
      cartItems: [],

      addItem: (item) =>
        set((state) => {
          const existing = state.cartItems.find((i) => i.id === item.id);
          if (existing) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
        }),

      addItems: (item, count) =>
        set((state) => {
          const existing = state.cartItems.find((i) => i.id === item.id);
          if (existing) {
            return {
              cartItems: state.cartItems.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + count }
                  : i
              ),
            };
          }
          return {
            cartItems: [...state.cartItems, { ...item, quantity: count }],
          };
        }),

      updateQuantity: (itemId, quantity) =>
        set((state) => {
          if (quantity < 1) {
            return {
              cartItems: state.cartItems.filter((i) => i.id !== itemId),
            };
          }
          return {
            cartItems: state.cartItems.map((i) =>
              i.id === itemId ? { ...i, quantity } : i
            ),
          };
        }),

      removeItem: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== itemId),
        })),

      clearCart: () => set({ cartItems: [] }),
    }),
    { name: "cart-storage" }
  )
);

export default useCartStore;
