import { GradingPeriod } from "../../../store/gradingPeriod/interfaces/GradingPeriod";

export interface EditTabProps {
  setIsEditTabVisible: (isEditTableVisible: boolean) => void;
  gradingPeriod: GradingPeriod;
}
