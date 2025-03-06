import { Grade } from "./Grade";
import { Student } from "./Student";
import { StudentRow } from "./StudentRow";

export interface Students {
  students: StudentRow[];
  isSaved: boolean;
  setIsSaved: (isSaved: boolean) => void;
  getStudentRows: (groupId: string) => Promise<any>;
  addStudent: (student: Student) => void;
  addGradeInStore: (grade: Grade) => void;
  updateGradeInStore: (grade: Grade) => void;
  updateAPI: (students?: Student[], grades?: Grade[]) => Promise<any>;
  setAllSaved: VoidFunction;
}
