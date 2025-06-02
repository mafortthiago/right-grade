import { ApiError } from "../../../errors";
import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API_ASSESSMENTS, useAssessmentStore } from "../assessments";
import { useStudentStore } from "../../students/students";
import { addTotal } from "../../students/functions/getStudentRows";

export const deleteAssessment = async (id: string) => {
  const response = await generateFetch(
    URL_API_ASSESSMENTS + `/${id}`,
    "DELETE"
  );
  if (!response.ok) {
    throw new ApiError(JSON.stringify(await response.json()));
  }
  deleteAssessmentInStore(id);
};

const deleteAssessmentInStore = (id: string) => {
  const currentAssessments = useAssessmentStore.getState().assessments;

  const updatedAssessments = currentAssessments.filter((assessment) => {
    const isTargetAssessment = assessment.id === id;
    const isRecoveryOfTarget = assessment.originalAssessmentId === id;
    return !isTargetAssessment && !isRecoveryOfTarget;
  });

  useAssessmentStore.setState(() => ({
    assessments: updatedAssessments,
  }));
  recalculateAllStudentGrades();
};

const recalculateAllStudentGrades = () => {
  const students = useStudentStore.getState().students;
  const currentGradingPeriodId =
    useStudentStore.getState().currentGradingPeriodId;

  const updatedStudents = students.map((student) =>
    addTotal({ ...student }, currentGradingPeriodId)
  );

  useStudentStore.setState({
    students: updatedStudents,
  });
};
