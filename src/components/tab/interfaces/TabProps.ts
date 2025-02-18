import { ReactNode } from "react";
import { GradingPeriod } from "../../../store/gradingPeriod/interfaces/GradingPeriod";

export interface TabProps {
  gradingPeriod: GradingPeriod;
  children: ReactNode;
  label: string;
}
