import { ApiError } from "../../../errors";
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
    throw new ApiError(JSON.stringify(await response.json()));
  }

  renameAssessmentInStorage(assessment);
};

function renameAssessmentInStorage(assessment: Assessment) {
  const currentAssessments = useAssessmentStore.getState().assessments;
  const updatedAssessments = currentAssessments.map((a) => {
    if (a.id === assessment.id) {
      return assessment;
    }
    return a;
  });
  useAssessmentStore.setState(() => ({
    assessments: updatedAssessments,
  }));
}
