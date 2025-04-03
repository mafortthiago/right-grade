import { t } from "i18next";
import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API_ASSESSMENTS, useAssessmentStore } from "../assessments";
import { Assessment } from "../interfaces/Assessment";
import { RecoveryAssessment } from "../interfaces/RecoveryAssessment";
import { markAssessmentWithRecovery } from "./markAssessmentWithRecovery";
import { ApiError } from "../../../errors";

export async function addRecoveryAssessment(assessment: Assessment) {
  validateIfIsOnlyOneRecovery(assessment.id || "");
  const response = await generateFetch(
    `${URL_API_ASSESSMENTS}/recovery`,
    "POST",
    { assessmentId: assessment.id }
  );

  if (!response.ok) {
    throw new ApiError("An error occurred while adding the recovery");
  }

  const newAssessment: RecoveryAssessment = await response.json();
  newAssessment.isRecovery = true;
  markAssessmentWithRecovery(assessment.id || "", newAssessment.id || "");
  insertAfterAssessment(assessment.id || "", newAssessment);
  return newAssessment;
}

const validateIfIsOnlyOneRecovery = (assessmentId: string) => {
  const assessments = useAssessmentStore.getState().assessments;
  const assessment = assessments.find(
    (assessment) => assessment.id === assessmentId
  );
  if (assessment?.recoveryAssessmentId) {
    throw new Error(t("table.assessment.errorOnlyRecovery"));
  }
};

const insertAfterAssessment = (
  assessmentId: string,
  newAssessment: Assessment
) => {
  const assessments = useAssessmentStore.getState().assessments;
  const index = assessments.findIndex((a) => a.id === assessmentId);

  if (index !== -1) {
    const updatedAssessments = [
      ...assessments.slice(0, index + 1),
      newAssessment,
      ...assessments.slice(index + 1),
    ];
    useAssessmentStore.setState({ assessments: updatedAssessments });
  } else {
    useAssessmentStore.setState({
      assessments: [...assessments, newAssessment],
    });
  }
};
