import { UserLogin } from "./UserLogin";
import { UserRegister } from "./UserRegister";

export interface UserStore {
  token: string;
  id: string;
  isAuthenticated: boolean;
  login: (user: UserLogin) => Promise<void>;
  checkAuth: () => void;
  logout: () => void;
  register: (user: UserRegister) => void;
  deleteAccount: () => void;
}
