import { t } from "i18next";
import { URL_API } from "../../URL_API";
import { triggerGlobalSnackbar } from "../../../util/globalSnackbar";
import i18n from "../../../lib/i18n";

export async function resetPassword(
  email: string,
  newPassword: string,
  code: string
) {
  const response = await fetch(`${URL_API}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": i18n.language,
    },
    body: JSON.stringify({
      email,
      newPassword,
      code,
    }),
  });

  if (!response.ok) {
    const r = await response.json();
    if (r.error) {
      triggerGlobalSnackbar({
        title: t("error"),
        body: r.error,
        isError: true,
      });
      throw new Error(r.error);
    }
    throw new Error(JSON.stringify(r));
  }
  triggerGlobalSnackbar({
    title: t("success"),
    body: t("changePassword.successBody"),
    isError: false,
  });
}
