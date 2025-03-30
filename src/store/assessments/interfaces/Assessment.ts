import { Grade } from "../../students/interfaces/Grade";

export interface Assessment {
  id?: string;
  name: string;
  value: number;
  createdAt?: Date;
  gradingPeriodId: string;
  grades?: Grade[];
  isRecovery?: boolean;
  originalGradeId?: string;
  recoveryGradeId?: string;
}
