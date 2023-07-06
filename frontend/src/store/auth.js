import { create } from "zustand";
import { mountStoreDevtool } from "simple-zustand-devtools";

const useAuthStore = create((set, get) => ({
  allUserData: null, // Use this to store all user data
  loading: false,
  user: () => ({
    user_id: get().allUserData?.user_id || null,
    username: get().allUserData?.username || null,
    email: get().allUserData?.email || null,
    first_name: get().allUserData?.first_name || null,
    is_empresa: get().allUserData?.is_empresa || null,
    is_candidato: get().allUserData?.is_candidato || null,
    tudo: get().allUserData || null,
  }),
  setUser: (user) => set({ allUserData: user }),
  setLoading: (loading) => set({ loading }),
  isLoggedIn: () => get().allUserData !== null,
}));

if (import.meta.env.DEV) {
  mountStoreDevtool("Store", useAuthStore);
}

export { useAuthStore };
