import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API } from "../../URL_API";

export async function sendCode(email: string) {
  const response = await generateFetch(`${URL_API}/auth/send-code`, "POST", {
    email,
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }
}
