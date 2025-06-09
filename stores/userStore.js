import { create } from 'zustand';
import Parse from '@/lib/parseConfig';

export const useUserStore = create((set) => ({
  user: null,

  verificarLogin: async () => {
    const user = await Parse.User.currentAsync();
    if (!user) return null;
    set({ user });
    return user;
  },

  logout: async () => {
    await Parse.User.logOut();
    set({ user: null });
  },
}));
