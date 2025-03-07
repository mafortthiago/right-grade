import { Grade } from "../interfaces/Grade";
import { useStudentStore } from "../students";
import { addTotal } from "./getStudentRows";

export function addGradeInStore(grade: Grade) {
  const studentStore = useStudentStore.getState();
  let currentStudent = studentStore.students.find(
    (s) => s.id === grade.studentId
  );

  if (!currentStudent) {
    return;
  }

  const updatedGrades = currentStudent.grades.map((g) => {
    if (g.id === grade.id) {
      return {
        ...g,
        value: grade.value,
      };
    } else {
      return g;
    }
  });

  if (!updatedGrades.some((g) => g.id === grade.id)) {
    updatedGrades.push(grade);
  }

  currentStudent.grades = updatedGrades;
  currentStudent = addTotal(currentStudent);
  useStudentStore.setState((state) => ({
    students: state.students.map((student) =>
      student.id === currentStudent.id ? currentStudent : student
    ),
  }));
}
