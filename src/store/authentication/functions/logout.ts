import { useAuthStore } from "../auth";
import { useClassStore } from "../../classes";
import { URL_API } from "../../URL_API";

export const logout = async () => {
  useAuthStore.setState({ token: "", isAuthenticated: false, id: "" });
  useClassStore.setState({ groups: [] });

  await fetch(URL_API + "/auth/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
