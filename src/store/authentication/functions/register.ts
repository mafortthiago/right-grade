import { t } from "i18next";
import { ApiError } from "../../../errors";
import { triggerGlobalSnackbar } from "../../../util/globalSnackbar";
import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API } from "../../URL_API";
import { UserRegister } from "../interfaces/UserRegister";
import i18n from "../../../lib/i18n";

export const register = async (user: UserRegister) => {
  const response = await generateFetch(`${URL_API}/register`, "POST", user);

  if (!response.ok) {
    const responseError = await response.json();
    throw new ApiError(JSON.stringify(responseError));
  }

  await sendConfirmEmail(user.email);
  triggerGlobalSnackbar({
    title: t("success"),
    body: t("authentication.register.confirmEmail", { email: user.email }),
    isError: false,
  });
};

const sendConfirmEmail = async (email: string) => {
  const response = await fetch(`${URL_API}/auth/confirm-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": i18n.language,
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const r = await response.json();

    throw new ApiError(JSON.stringify(r));
  }
};
