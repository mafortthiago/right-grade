import { ErrorMessages } from "../../../util/errorTranslator";
import { GradingPeriod } from "./GradingPeriod";

export interface GradingPeriods {
  gradingPeriods: GradingPeriod[];
  addGradingPeriod: (gradingPeriod: GradingPeriod) => void;
  getGradingPeriods: () => Promise<any>;
  editGradingPeriod: (
    gradingPeriod: GradingPeriod,
    errorMessages: ErrorMessages
  ) => Promise<void>;
  deleteGradingPeriod: (gradingPeriod: GradingPeriod) => void;
}
