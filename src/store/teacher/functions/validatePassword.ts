import { t } from "i18next";
import { ApiError } from "../../../errors";
import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API } from "../../URL_API";

export async function validatePassword(newPassword: string, email: string) {
  const response = await generateFetch(
    `${URL_API}/auth/validate-password`,
    "POST",
    { password: newPassword, email }
  );
  if (!response.ok) {
    throw new ApiError(t("authentication.incorrectPassword"));
  }
}
