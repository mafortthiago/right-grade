import { ApiError } from "../../../errors";
import i18n from "../../../lib/i18n";
import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API_ASSESSMENTS, useAssessmentStore } from "../assessments";
import { Assessment } from "../interfaces/Assessment";

export const renameAssessment = async (assessment: Assessment) => {
  const response = await generateFetch(
    URL_API_ASSESSMENTS + `/${assessment.id}`,
    "PATCH",
    {
      name: assessment.name,
    }
  );

  if (!response.ok) {
    const res = await response.json();
    throw new ApiError(res.error);
  }

  renameAssessmentInStorage(assessment);
};

function renameAssessmentInStorage(assessment: Assessment) {
  const currentAssessments = useAssessmentStore.getState().assessments;
  const updatedAssessments = currentAssessments.map((a) => {
    if (a.id === assessment.id) {
      return assessment;
    }
    if (a.id === assessment.recoveryAssessmentId) {
      return {
        ...a,
        name: `${assessment.name} 
        ${i18n.language == "pt" ? " (Recuperação)" : " (Recovery)"}`,
      };
    }
    return a;
  });
  useAssessmentStore.setState(() => ({
    assessments: updatedAssessments,
  }));
}
