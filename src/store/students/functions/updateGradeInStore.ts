import { Grade } from "../interfaces/Grade";
import { useStudentStore } from "../students";
import { addTotal } from "./getStudentRows";

export function updateGradeInStore(grade: Grade) {
  let currentStudent = useStudentStore
    .getState()
    .students.find((s) => s.id === grade.studentId);

  if (!currentStudent) {
    return;
  }

  grade.isSaved = false;

  const updatedGrades = currentStudent.grades.map((g) => {
    if (g.id == grade.id) {
      return grade;
    } else {
      return g;
    }
  });

  currentStudent.grades = updatedGrades;
  currentStudent = addTotal(currentStudent);
  useStudentStore.setState((state) => ({
    students: state.students.map((s) =>
      s.id === currentStudent.id ? currentStudent : s
    ),
  }));
}
