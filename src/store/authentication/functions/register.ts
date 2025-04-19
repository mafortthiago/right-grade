import { ApiError } from "../../../errors";
import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API } from "../../URL_API";
import { useAuthStore } from "../auth";
import { UserRegister } from "../interfaces/UserRegister";

export const register = async (user: UserRegister) => {
  const response = await generateFetch(`${URL_API}/register`, "POST", user);

  if (!response.ok) {
    const responseError = await response.json();
    throw new ApiError(JSON.stringify(responseError));
  }

  const data = await response.json();

  localStorage.setItem("jwt", data.refreshToken);

  useAuthStore.setState({
    token: data.refreshToken,
    isAuthenticated: true,
    id: data.id,
  });
};
