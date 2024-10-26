import { create } from "zustand";
export type UserLogin = {
  email: string;
  password: string;
};
type ErrorMessages = {
  serverError: string;
  badCredentials: string;
};
type User = {
  token: string | null;
  isAuthenticated: boolean;
  login: (
    user: UserLogin,
    error: ErrorMessages,
    onError?: (error: string) => void
  ) => Promise<void>;
  checkAuth: () => void;
  logout: () => void;
};

export const useAuthStore = create<User>((set) => ({
  token: "",
  isAuthenticated: false,
  login: async (
    user: UserLogin,
    errorMessages,
    onError?: (error: string) => void
  ) => {
    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.status === 401) {
        throw new Error(errorMessages.badCredentials);
      }
      // Converte a resposta para JSON caso seja válida
      const jsonData = await response.json();
      localStorage.setItem("jwt", jsonData.refreshToken);
      set({
        token: jsonData.token,
        isAuthenticated: true,
      });
    } catch (error: any) {
      if (error.message.includes("Failed to fetch")) {
        error.message = errorMessages.serverError;
      }
      if (onError) {
        onError(error.message);
      }
    }
  },
  checkAuth: () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      set({ token: token, isAuthenticated: true });
    }
  },
  logout: () => {
    localStorage.removeItem("jwt");
    set({ token: null, isAuthenticated: false });
  },
}));
