export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: number[];
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: string;
  image: any;
  photoUrl: string;
  manufacturerId: number;
}
export interface AuthStoreState {
  user: User | null;
  token: string | null;
  productsCount: number;
  setUser: (user: User) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export interface Manufacturer {
  id: number;
  name: string;
}
export interface ManufacturerStoreState {
  manufacturers: Manufacturer[];
  setManufacturers: (manufacturers: Manufacturer[] | undefined) => void;
}
export interface IMenuButton {
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
export interface ModalState {
  modals: {
    [key: string]: boolean;
  };
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
}
