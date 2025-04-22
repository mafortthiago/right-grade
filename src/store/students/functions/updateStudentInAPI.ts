import { ApiError } from "../../../errors";
import { Student } from "../interfaces/Student";
import { URL_API_STUDENTS } from "../students";
import { generateFetch } from "./updateAPI";
import { updateStudentInStore } from "./updateStudentInStore";

export async function updateStudentInAPI(student: Student) {
  const response = await generateFetch(
    `${URL_API_STUDENTS}/${student.id}`,
    "PUT",
    student
  );

  if (!response.ok) {
    const errorData = JSON.stringify(await response.json());
    throw new ApiError(errorData);
  }
  const updatedStudent: Student = await response.json();
  updatedStudent.isSaved = true;
  updateStudentInStore(updatedStudent);
}
