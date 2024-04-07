import { IOrder, IAdminOrder } from "@/types/order.type";
import create from "zustand";
import { serviceGetOrders } from "@/services/order.services";
import { serviceGetOrders as serviceGetAdminOrders } from "@/services/admin.order.services";

type OrderStore = {
  orders: {
    loading: boolean;
    data: IOrder[];
    error?: string;
  };
  adminOrders: {
    loading: boolean;
    data: IAdminOrder[];
    error?: string;
  };
  getOrders: () => void;
  getAdminOrders: () => void;
  updateAdminOrder: (order: IAdminOrder) => void;
};

const useOrderStore = create<OrderStore>((set) => ({
  orders: {
    loading: false,
    data: [],
  },
  adminOrders: {
    loading: false,
    data: [],
  },
  getOrders: async () => {
    set((state) => ({
      orders: {
        ...state.orders,
        loading: true,
      },
    }));

    try {
      const data = await serviceGetOrders();
      set((state) => ({
        orders: {
          ...state.orders,
          loading: false,
          data,
        },
      }));
    } catch (error: any) {
      set((state) => ({
        orders: {
          ...state.orders,
          loading: false,
          error: error.message,
        },
      }));
    }
  },
  getAdminOrders: async () => {
    set((state) => ({
      adminOrders: {
        ...state.adminOrders,
        loading: true,
      },
    }));

    try {
      const data = await serviceGetAdminOrders();
      set((state) => ({
        adminOrders: {
          ...state.adminOrders,
          loading: false,
          data,
        },
      }));
    } catch (error: any) {
      set((state) => ({
        adminOrders: {
          ...state.adminOrders,
          loading: false,
          error: error.message,
        },
      }));
    }
  },
  updateAdminOrder: (order) => {
    set((state) => ({
      adminOrders: {
        ...state.adminOrders,
        data: state.adminOrders.data.map((o) =>
          o._id === order._id ? order : o
        ),
      },
    }));
  },
}));

export default useOrderStore;
