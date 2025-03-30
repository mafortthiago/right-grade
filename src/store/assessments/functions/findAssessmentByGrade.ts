import { useAssessmentStore } from "../assessments";

export const findAssessmentById = (id: string) => {
  const assessments = useAssessmentStore.getState().assessments;
  const assessment = assessments.find((assessment) => assessment.id === id);
  return assessment;
};
