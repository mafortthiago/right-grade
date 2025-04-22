import { Student } from "../interfaces/Student";
import { URL_API_STUDENTS, useStudentStore } from "../students";
import { generateFetch } from "./updateAPI";

export async function addStudent(student: Student) {
  const response = await generateFetch(URL_API_STUDENTS, "POST", student);

  if (!response.ok) {
    const responseError = JSON.stringify(await response.json());
    throw new Error(responseError);
  }

  const newStudent: Student = await response.json();
  newStudent.isSaved = true;

  const currentStudents = useStudentStore.getState().students;
  const updatedStudents = [
    ...currentStudents,
    {
      ...newStudent,
      grades: [],
      isSaved: true,
    },
  ];
  useStudentStore.setState(() => ({
    students: updatedStudents,
  }));
}
