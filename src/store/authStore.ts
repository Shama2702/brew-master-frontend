import { create } from "zustand";
import { IMe } from "@/types/auth.type";
import { serviceAuth } from "@/services/auth.services";
import { getToken } from "../helper/token";

interface AuthState {
  me: {
    loading: boolean;
    data?: IMe;
  };
  setMe: (data: IMe) => void;
  authMe: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  me: {
    loading: true,
  },
  setMe: (data) => {
    set(() => ({
      me: {
        loading: false,
        data,
      },
    }));
  },
  authMe: async () => {
    const token = getToken();
    if (!token) {
      set({
        me: {
          loading: false,
        },
      });
    } else {
      try {
        const me = await serviceAuth();
        set({
          me: {
            loading: false,
            data: me,
          },
        });
      } catch (error: any) {
        set({
          me: {
            loading: false,
          },
        });
      }
    }
  },
}));

export default useAuthStore;
