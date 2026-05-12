import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

const useOrderStore = create(
  devtools(
    persist(
      (set) => ({
        orders: [],
        addOrder: (order) =>
          set((state) => ({ orders: [order, ...state.orders] })),
        clearOrders: () => set({ orders: [] }),
      }),
      { name: "order-storage" }
    )
  )
);

export default useOrderStore;
