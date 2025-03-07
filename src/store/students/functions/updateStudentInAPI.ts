import { ApiError } from "../../../errors";
import { Student } from "../interfaces/Student";
import { TOKEN, URL_API_STUDENTS, useStudentStore } from "../students";
import { updateStudentInStore } from "./updateStudentInStore";

export async function updateStudentInAPI(student: Student) {
  const response = await fetch(`${URL_API_STUDENTS}/${student.id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });

  if (!response.ok) {
    const errorData = JSON.stringify(await response.json());
    throw new ApiError(errorData);
  }
  const updatedStudent: Student = await response.json();
  updatedStudent.isSaved = true;
  updateStudentInStore(updatedStudent);
}
