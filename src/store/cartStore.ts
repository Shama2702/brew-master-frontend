import { create } from "zustand";
import { ICoffee } from "../types/coffee.type";

interface CartState {
  cart: {
    coffee: ICoffee;
    quantity: number;
  }[];

  addToCart: (coffee: ICoffee, quantity: number) => void;
  removeFromCart: (coffeeId: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (coffee, quantity) => {
    set((state) => {
      const existingCoffee = state.cart.find(
        (item) => item.coffee._id === coffee._id
      );
      if (existingCoffee) {
        return {
          cart: state.cart.map((item) => {
            if (item.coffee._id === coffee._id) {
              return {
                coffee,
                quantity: item.quantity + quantity,
              };
            }
            return item;
          }),
        };
      }
      return {
        cart: [
          ...state.cart,
          {
            coffee,
            quantity,
          },
        ],
      };
    });
  },
  removeFromCart: (coffeeId) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.coffee._id !== coffeeId),
    }));
  },
  clearCart: () => {
    set(() => ({
      cart: [],
    }));
  },
}));

export default useCartStore;
