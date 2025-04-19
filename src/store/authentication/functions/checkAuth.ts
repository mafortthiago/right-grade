import { useAuthStore } from "../auth";

export const checkAuth = () => {
  const token = localStorage.getItem("jwt");
  const id = localStorage.getItem("id");
  if (token && id) {
    useAuthStore.setState({ token: token, isAuthenticated: true, id: id });
  }
};
