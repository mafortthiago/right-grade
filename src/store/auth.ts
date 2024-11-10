import { create } from "zustand";
export type UserLogin = {
  email: string;
  password: string;
};
type UserRegister = {
  email: string;
  name: string;
  password: string;
};
type ErrorMessages = {
  serverError: string;
  badCredentials: string;
  invalidEmail?: string;
  invalidName?: string;
  invalidPassword?: string;
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
  register: (
    user: UserRegister,
    error: ErrorMessages,
    onError?: (error: any) => void
  ) => void;
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
  register: async (
    user: UserRegister,
    errorMessages: ErrorMessages,
    onError?: (error: any) => void
  ) => {
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.status != 201) {
        throw new Error(JSON.stringify(data));
      }
      localStorage.setItem("jwt", data.refreshToken);
      set({
        token: data.refreshToken,
        isAuthenticated: true,
      });
    } catch (error: any) {
      if (onError) {
        let dataError = JSON.parse(error.message);
        let translatedErrors = errorTranslator(dataError, errorMessages);
        onError(translatedErrors);
      }
    }
  },
}));

const errorTranslator = (
  error: { email?: string; name?: string; password?: string },
  errorMessages: ErrorMessages
) => {
  // Verify if the email property exists and is a string
  if (error.email && typeof error.email === "string") {
    error.email = errorMessages.invalidEmail;
  }
  // Verify if the name property exists and is a string
  if (error.name && typeof error.name === "string") {
    error.name = errorMessages.invalidName;
  }
  // Verify if the password property exists and is a string
  if (error.password && typeof error.password === "string") {
    error.password = errorMessages.invalidPassword;
  }
  return error;
};
