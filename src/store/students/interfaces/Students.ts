import { Box } from "../../../components/table/selectedBoxes";
import { Grade } from "./Grade";
import { Student } from "./Student";
import { StudentRow } from "./StudentRow";

export interface Students {
  students: StudentRow[];
  isSaved: boolean;
  hasInvalidValues: boolean;
  setHasInvalidValues: (value: boolean) => void;
  setIsSaved: (isSaved: boolean) => void;
  getStudentRows: (groupId: string) => Promise<any>;
  addStudent: (student: Student) => void;
  addGradeInStore: (grade: Grade) => void;
  updateGradeInStore: (grade: Grade) => void;
  updateAPI: (students?: Student[], grades?: Grade[]) => Promise<any>;
  setAllSaved: VoidFunction;
  deleteStudents: (students: Box) => Promise<any>;
}
