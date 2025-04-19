import { create } from "zustand";
import { UserStore } from "./interfaces/UserStore";
import { login } from "./functions/login";
import { checkAuth } from "./functions/checkAuth";
import { logout } from "./functions/logout";
import { register } from "./functions/register";

export const useAuthStore = create<UserStore>(() => ({
  token: "",
  id: "",
  isAuthenticated: false,
  login,
  checkAuth,
  logout: logout,
  register: register,
}));
