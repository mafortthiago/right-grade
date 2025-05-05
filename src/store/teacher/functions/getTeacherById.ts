import { ApiError } from "../../../errors";
import { useAuthStore } from "../../authentication/auth";

import { generateFetch } from "../../students/functions/updateAPI";
import { Teacher } from "../interfaces/Teacher";
import { URL_API_TEACHERS } from "../teachers";

export async function getTeacherById() {
  const teacherId = useAuthStore.getState().id;
  const response = await generateFetch(
    `${URL_API_TEACHERS}/${teacherId}`,
    "GET"
  );

  if (!response.ok) {
    throw new ApiError(JSON.stringify(await response.json()));
  }

  const teacher: Teacher = await response.json();
  teacher.id = teacherId;

  return teacher;
}
