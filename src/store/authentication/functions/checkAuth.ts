import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API } from "../../URL_API";
import { useAuthStore } from "../auth";

export const checkAuth = async () => {
  const response = await generateFetch(`${URL_API}/me`, "GET");
  if (response.ok) {
    const data = await response.json();
    useAuthStore.setState({
      isAuthenticated: true,
      id: data.id,
    });
  } else {
    useAuthStore.setState({
      isAuthenticated: false,
      id: "",
    });
  }
};
