import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API_ASSESSMENTS, useAssessmentStore } from "../assessments";
import { Assessment } from "../interfaces/Assessment";

export const changeAssessmentValue = async (assessment: Assessment) => {
  const response = await generateFetch(
    URL_API_ASSESSMENTS + `/${assessment.id}`,
    "PATCH",
    { value: assessment.value }
  );

  if (!response.ok) {
    const res = await response.json();
    throw new Error(res.error);
  }
  changeValueInStorage(assessment);
};

function changeValueInStorage(assessment: Assessment) {
  const currentAssessments = useAssessmentStore.getState().assessments;
  const updatedAssessments = currentAssessments.map((a) => {
    if (a.id === assessment.id) {
      return assessment;
    }
    if (a.id === assessment.recoveryAssessmentId) {
      return {
        ...a,
        value: assessment.value,
      };
    }
    return a;
  });
  useAssessmentStore.setState(() => ({
    assessments: updatedAssessments,
  }));
}
