import { useAssessmentStore } from "../assessments";

export const markAssessmentWithRecovery = (
  assessmentId: string,
  recoveryAssessmentId: string
) => {
  const assessments = useAssessmentStore.getState().assessments;
  const updatedAssessments = assessments.map((assessment) => {
    if (assessment.id == assessmentId) {
      assessment.recoveryAssessmentId = recoveryAssessmentId;
    }
    return assessment;
  });
  useAssessmentStore.setState(() => ({
    assessments: updatedAssessments,
  }));
};
