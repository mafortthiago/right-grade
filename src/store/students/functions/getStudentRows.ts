import { ApiError } from "../../../errors";
import { findAssessmentById } from "../../assessments/functions/findAssessmentByGrade";
import { Grade } from "../interfaces/Grade";
import { StudentRow } from "../interfaces/StudentRow";
import { TOKEN, URL_API_STUDENTS, useStudentStore } from "../students";

export async function getStudentRows(
  groupId: string,
  gradingPeriodId?: string
) {
  const response = await fetch(`${URL_API_STUDENTS}/byGroup/${groupId}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new ApiError(JSON.stringify(await response.json()));
  }

  const students: StudentRow[] = await response.json();

  const studentsWithTotal = students.map((s) => {
    const studentCopy = JSON.parse(JSON.stringify(s));
    studentCopy.grades = studentCopy.grades.filter(
      (g: Grade) => g.id !== "total"
    );
    return addTotal(studentCopy, gradingPeriodId);
  });

  const updatedStudents = studentsWithTotal.map((s) => ({
    ...s,
    isSaved: true,
  }));

  useStudentStore.setState({
    students: updatedStudents,
    currentGradingPeriodId: gradingPeriodId || "",
  });
}

export function addTotal(
  student: StudentRow,
  gradingPeriodId?: string
): StudentRow {
  const periodId =
    gradingPeriodId || useStudentStore.getState().currentGradingPeriodId;
  const gradesSum = calculateGradesSum(student, periodId);
  const total = calculateTotal(gradesSum);
  updateStudentGrades(student, total);
  return student;
}

// Filters grades and calculates the grades sum
function calculateGradesSum(student: StudentRow, gradingPeriodId?: string) {
  const availableGrades = student.grades.filter((g) => g.id !== "total");
  const gradesMap: Record<
    string,
    { gradeId: string; assessmentId: string; value: number }
  > = {};

  for (let grade of availableGrades) {
    const assessment = findAssessmentById(grade.assessmentId);
    if (gradingPeriodId && assessment?.gradingPeriodId !== gradingPeriodId) {
      continue;
    }

    if (!assessment?.isRecovery) {
      gradesMap[assessment?.id || ""] = {
        gradeId: grade.id,
        assessmentId: assessment?.id || "",
        value: grade.value,
      };
    }
  }

  for (let grade of availableGrades) {
    const assessment = findAssessmentById(grade.assessmentId);
    if (gradingPeriodId && assessment?.gradingPeriodId !== gradingPeriodId) {
      continue;
    }
    if (assessment?.isRecovery && assessment.originalAssessmentId) {
      const originalAssessmentId = assessment.originalAssessmentId;
      if (
        gradesMap[originalAssessmentId] &&
        gradesMap[originalAssessmentId].value < grade.value
      ) {
        gradesMap[originalAssessmentId] = {
          gradeId: grade.id,
          assessmentId: assessment.id || "",
          value: grade.value,
        };
      }
    }
  }

  return Object.values(gradesMap);
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
