import { create } from 'zustand';
import Parse from '@/lib/parseConfig';
export const useUserStore = create((set) => ({
  user: undefined, // undefined indica "não verificado ainda", null é "deslogado"

  verificarLogin: async () => {
    const user = await Parse.User.currentAsync();
    if (user) {
      set({ user });
      return user;
    } else {
      set({ user: null });
      return null;
    }
  },

  logout: async () => {
    await Parse.User.logOut();
    set({ user: null });
  },
}));
