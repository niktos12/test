import { create } from "zustand";
import {
  AuthStoreState,
  User,
  ManufacturerStoreState,
  ModalState,
} from "../types";

export const useAuthStore = create<AuthStoreState>((set) => ({
  user: null,
  token: null,
  productsCount: 100,
  setUser: (user: User | null) => set({ user }),
  setToken: (token: string | null) => set({ token }),
  logout: () => set({ user: null, token: null }),
}));
export const useManufacturesStore = create<ManufacturerStoreState>((set) => ({
  manufacturers: [],
  setManufacturers: (manufacturers) => set({ manufacturers }),
}));

export const useModalStore = create<ModalState>((set) => ({
  modals: {
    addProduct: false,
    deleteProduct:false,
    editProduct:false,
    viewProduct:false,
  },
  openModal: (modalName) =>
    set((state) => ({
      modals: { ...state.modals, [modalName]: true },
    })),
  closeModal: (modalName) =>
    set((state) => {
      const newModals = { ...state.modals };
      delete newModals[modalName];
      return { modals: newModals };
    }),
}));
