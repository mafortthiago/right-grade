import { ApiError } from "../../../errors";
import { StudentRow } from "../interfaces/StudentRow";
import { TOKEN, URL_API_STUDENTS, useStudentStore } from "../students";

export async function getStudentRows(groupId: string) {
  const response = await fetch(`${URL_API_STUDENTS}/byGroup/${groupId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new ApiError(JSON.stringify(await response.json()));
  }

  const students: StudentRow[] = await response.json();
  const studentsWithTotal = students.map((s) => addTotal(s));
  const updatedStudents = studentsWithTotal.map((s) => ({
    ...s,
    isSaved: true,
  }));
  useStudentStore.setState({ students: updatedStudents });
}

export function addTotal(student: StudentRow) {
  const total = student.grades.reduce((acc, grade) => {
    if (grade.id === "total") {
      return acc;
    } else {
      return (
        acc +
        (typeof grade.value === "number"
          ? grade.value
          : parseFloat(grade.value))
      );
    }
  }, 0);
  const totalGrade = {
    id: "total",
    value: total,
    isSaved: true,
    studentId: "",
    assessmentId: "total",
  };
  const existingTotalGrade = student.grades.find(
    (grade) => grade.id === "total"
  );
  if (!existingTotalGrade) {
    student.grades.push(totalGrade);
  } else {
    existingTotalGrade.value = total;
  }

  return student;
}
