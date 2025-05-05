import { t } from "i18next";
import { ApiError } from "../../../errors";
import { errorTranslator } from "../../../util/errorTranslator";
import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API_TEACHERS, useTeacherStore } from "../teachers";
import { useAuthStore } from "../../authentication/auth";

export async function updateName(name: string) {
  const teacherId = useAuthStore.getState().id;
  const response = await generateFetch(
    `${URL_API_TEACHERS}/${teacherId}`,
    "PATCH",
    { name }
  );

  if (!response.ok) {
    const errorMessages = {
      incorrectName: t("authentication.register.invalidName"),
    };
    const translatedErrors = errorTranslator(
      await response.json(),
      errorMessages
    );
    throw new ApiError(JSON.stringify(translatedErrors));
  }

  updateNameInStore(name);
}

function updateNameInStore(name: string) {
  useTeacherStore.setState((state) => ({
    teacher: { ...state.teacher, name },
  }));
}
