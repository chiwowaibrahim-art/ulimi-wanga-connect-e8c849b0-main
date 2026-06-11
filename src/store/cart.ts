import { create } from "zustand";

export type CartItem = {
  id: string;
  name: string;
  seller: string;
  district: string;
  price: number;
  image: string;
  qty: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty">, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: () => number;
  total: () => number;
};

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (item, qty) =>
    set((s) => {
      const existing = s.items.find((i) => i.id === item.id);
      if (existing) {
        return {
          items: s.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + qty } : i,
          ),
        };
      }
      return { items: [...s.items, { ...item, qty }] };
    }),
  remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
  count: () => get().items.reduce((a, i) => a + i.qty, 0),
  total: () => get().items.reduce((a, i) => a + i.qty * i.price, 0),
}));
