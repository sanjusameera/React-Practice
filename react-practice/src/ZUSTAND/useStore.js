
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () =>
    set((state) => ({ count: state.count + 1 })),
  decrement: () =>
    set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),

  username: "Sanju",
  setUsername: (username) => set({ username }),

  theme: "Light",
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === "Light" ? "Dark" : "Light",
    })),
}));

export default useStore;
