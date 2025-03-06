import { Grade } from "./Grade";

export interface StudentRow {
  id: string;
  name: string;
  grades: Grade[];
  groupId: string;
  isSaved: boolean;
}
