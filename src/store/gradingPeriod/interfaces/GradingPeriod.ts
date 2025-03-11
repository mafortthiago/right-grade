import { Assessment } from "../../assessments/interfaces/Assessment";

export interface GradingPeriod {
  id?: string;
  name: string;
  groupId: string;
  assessments?: Assessment[];
}
