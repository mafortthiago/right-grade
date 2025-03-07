import { Student } from "../interfaces/Student";
import { TOKEN, URL_API_STUDENTS, useStudentStore } from "../students";

export async function addStudent(student: Student) {
  const response = await fetch(URL_API_STUDENTS, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify(student),
  });

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
    },
  ];
  useStudentStore.setState(() => ({
    students: updatedStudents,
  }));
}
