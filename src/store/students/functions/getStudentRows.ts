import { ApiError } from "../../../errors";
import { findAssessmentById } from "../../assessments/functions/findAssessmentByGrade";
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

export function addTotal(student: StudentRow): StudentRow {
  const gradesSum = calculateGradesSum(student);
  const total = calculateTotal(gradesSum);
  updateStudentGrades(student, total);
  return student;
}

// Filters grades and calculates the grades sum
function calculateGradesSum(student: StudentRow) {
  const availableGrades = student.grades.filter((g) => g.id !== "total");
  let gradesSum: { gradeId: string; assessmentId: string; value: number }[] =
    [];

  for (let grade of availableGrades) {
    const assessment = findAssessmentById(grade.assessmentId);
    if (assessment?.isRecovery) {
      gradesSum = handleRecoveryGrade(gradesSum, grade, assessment);
    } else {
      gradesSum.push({
        gradeId: grade.id,
        assessmentId: assessment?.id || "",
        value: grade.value,
      });
    }
  }

  return gradesSum;
}

// Handles recovery grades logic
function handleRecoveryGrade(
  gradesSum: { gradeId: string; assessmentId: string; value: number }[],
  grade: StudentRow["grades"][number],
  assessment: { id?: string }
) {
  return gradesSum.map((g) => {
    const originalGreater = g.value === Math.max(g.value, grade.value);
    if (originalGreater) {
      return g;
    }
    return {
      gradeId: grade.id,
      assessmentId: assessment.id || "",
      value: grade.value,
    };
  });
}

// Calculates the total value of grades
function calculateTotal(
  gradesSum: { gradeId: string; assessmentId: string; value: number }[]
) {
  return gradesSum.reduce((acc, grade) => acc + grade.value, 0);
}

// Updates the student object with the total grade
function updateStudentGrades(student: StudentRow, total: number) {
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
}
