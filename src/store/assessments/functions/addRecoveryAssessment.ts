import { t } from "i18next";
import { generateFetch } from "../../students/functions/updateAPI";
import { URL_API_ASSESSMENTS, useAssessmentStore } from "../assessments";
import { Assessment } from "../interfaces/Assessment";
import { RecoveryAssessment } from "../interfaces/RecoveryAssessment";
import { markAssessmentWithRecovery } from "./markAssessmentWithRecovery";

export async function addRecoveryAssessment(assessment: Assessment) {
  try {
    validateIfIsOnlyOneRecovery(assessment.id || "");
    const response = await generateFetch(
      `${URL_API_ASSESSMENTS}/recovery`,
      "POST",
      { assessmentId: assessment.id }
    );

    if (!response.ok) {
      console.log(await response.json());
    }

    const newAssessment: RecoveryAssessment = await response.json();
    newAssessment.isRecovery = true;
    markAssessmentWithRecovery(assessment.id || "", newAssessment.id || "");
    insertAfterAssessment(assessment.id || "", newAssessment);
    return newAssessment;
  } catch (error) {
    throw error;
  }
}

const validateIfIsOnlyOneRecovery = (assessmentId: string) => {
  const assessments = useAssessmentStore.getState().assessments;
  const assessment = assessments.find(
    (assessment) => assessment.id === assessmentId
  );
  if (assessment?.recoveryGradeId) {
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
