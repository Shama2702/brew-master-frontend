import { create } from "zustand";
import { ICoffee } from "../types/coffee.type";
import { serviceFetchMenus } from "../services/menu.services";

interface MenuState {
  menus: {
    loading: boolean;
    data: ICoffee[];
    error?: string;
  };

  fetchMenus: () => void;
  removeMenu: (id: string) => void;
}

const useMenuStore = create<MenuState>((set) => ({
  menus: {
    loading: false,
    data: [],
  },
  fetchMenus: async () => {
    set((state) => ({
      menus: {
        ...state.menus,
        loading: true,
      },
    }));
    try {
      const data = await serviceFetchMenus();
      set((state) => ({
        menus: {
          ...state.menus,
          loading: false,
          data,
        },
      }));
    } catch (error: any) {
      set((state) => ({
        menus: {
          ...state.menus,
          loading: false,
          error: error.message,
        },
      }));
    }
  },
  removeMenu: (id: string) => {
    set((state) => ({
      menus: {
        ...state.menus,
        data: state.menus.data.filter((menu) => menu._id !== id),
      },
    }));
  },
}));

export default useMenuStore;
