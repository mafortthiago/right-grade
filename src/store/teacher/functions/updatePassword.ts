import { ApiError } from "../../../errors";
import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API } from "../../URL_API";

export async function updatePassword(
  newPassword: string,
  email: string,
  code: string
) {
  const response = await generateFetch(
    `${URL_API}/auth/change-password`,
    "POST",
    { newPassword, email, code }
  );
  if (!response.ok) {
    throw new ApiError(JSON.stringify(await response.json()));
  }
}
