import { ErrorMessages } from "../../../util/errorTranslator";
import { Assessment } from "./Assessment";

export interface Assessments {
  assessments: Assessment[];
  getAssessments: (gradingPeriodId: string) => Promise<any>;
  addAssessment: (
    assessment: Assessment,
    errorMessages: ErrorMessages
  ) => Promise<any>;
}
