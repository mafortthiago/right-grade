import { useAuthStore } from "../auth";
import { useClassStore } from "../../classes";

export const logout = () => {
  useAuthStore.setState({ token: "", isAuthenticated: false, id: "" });
  useClassStore.setState({ groups: [] });
};
