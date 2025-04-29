import i18n from "../../../lib/i18n";
import { URL_API } from "../../URL_API";
import { useTeacherStore } from "../teachers";

export async function validateCode(email: string, code: string) {
  const response = await fetch(`${URL_API}/auth/verify-code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": i18n.language,
    },
    body: JSON.stringify({
      email,
      code,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }

  const responseJson = await response.json();
  const newCode = responseJson.code;

  useTeacherStore.setState(() => ({
    updatePasswordCode: newCode,
  }));
}
