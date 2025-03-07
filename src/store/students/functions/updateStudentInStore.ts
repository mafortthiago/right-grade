import { Student } from "../interfaces/Student";
import { useStudentStore } from "../students";

export function updateStudentInStore(updatedStudent: Student) {
  const currentStudents = useStudentStore.getState().students;
  const updatedStudents = currentStudents.map((s) => {
    if (s.id === updatedStudent.id) {
      return {
        ...s,
        ...updatedStudent,
      };
    }
    return s;
  });

  useStudentStore.setState(() => ({
    students: updatedStudents,
  }));
}
