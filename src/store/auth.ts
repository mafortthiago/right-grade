import { create } from "zustand";
import { JSONParseError, ApiError } from "../errors";
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
  token: string;
  id: string;
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
  id: "",
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

      if (response.status != 200) {
        throw new Error(errorMessages.badCredentials);
      }
      // Converte a resposta para JSON caso seja válida
      const jsonData = await response.json();
      localStorage.setItem("jwt", jsonData.refreshToken);
      localStorage.setItem("id", jsonData.id);
      set({
        token: jsonData.token,
        isAuthenticated: true,
        id: jsonData.id,
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
    const id = localStorage.getItem("id");
    if (token && id) {
      set({ token: token, isAuthenticated: true, id: id });
    }
  },
  logout: () => {
    localStorage.removeItem("jwt");
    set({ token: "", isAuthenticated: false });
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
      let data;
      try {
        data = await response.json();
      } catch {
        throw new JSONParseError();
      }
      if (response.status != 201) {
        throw new ApiError(JSON.stringify(data));
      }
      localStorage.setItem("jwt", data.refreshToken);
      set({
        token: data.refreshToken,
        isAuthenticated: true,
      });
    } catch (error: any) {
      if (onError) {
        if (error instanceof ApiError) {
          let dataError = JSON.parse(error.message);
          let translatedErrors: any = errorTranslator(dataError, errorMessages);
          onError(translatedErrors);
        } else if (error instanceof JSONParseError) {
          onError({ general: "The server returned an invalid response." });
        } else {
          onError({ general: "An unexpected error occurred." });
        }
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
