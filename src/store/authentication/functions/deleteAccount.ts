import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API_TEACHERS } from "../../teacher/teachers";
import { useAuthStore } from "../auth";

export const deleteAccount = async () => {
  const teacherId = useAuthStore.getState().id;
  const response = await generateFetch(
    URL_API_TEACHERS + `/${teacherId}`,
    "DELETE"
  );

  if (!response.ok) {
    throw new Error(await response.json());
  }
};
