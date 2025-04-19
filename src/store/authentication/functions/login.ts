import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API } from "../../URL_API";
import { useAuthStore } from "../auth";
import { UserLogin } from "../interfaces/UserLogin";

export const login = async (user: UserLogin) => {
  const response = await generateFetch(`${URL_API}/login`, "POST", user);

  if (!response.ok) {
    const responseError = await response.json();
    throw new Error(JSON.stringify(responseError));
  }

  const jsonData = await response.json();
  localStorage.setItem("jwt", jsonData.refreshToken);
  localStorage.setItem("id", jsonData.id);

  useAuthStore.setState({
    token: jsonData.token,
    isAuthenticated: true,
    id: jsonData.id,
  });
};
