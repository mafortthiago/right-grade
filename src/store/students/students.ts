import { create } from "zustand";
import { URL_API } from "../URL_API";
import { Students } from "./interfaces/Students";
import { getStudentRows } from "./functions/getStudentRows";
import { addStudent } from "./functions/addStudent";
import { updateAPI } from "./functions/updateAPI";
import { updateStudentInStore } from "./functions/updateStudentInStore";
import { updateStudentInAPI } from "./functions/updateStudentInAPI";
import { addGradeInStore } from "./functions/addGradeInStore";
import { updateGradeInStore } from "./functions/updateGradeInStore";
import { deleteStudents } from "./functions/deleteStudents";

export const URL_API_STUDENTS = URL_API + "/students";
export const URL_API_GRADES = URL_API + "/grades";
export const TOKEN = localStorage.getItem("jwt");

export const useStudentStore = create<Students>((set, get) => ({
  students: [],
  isSaved: true,
  setIsSaved: (isSaved: boolean) => {
    set({ isSaved });
  },
  getStudentRows,
  addStudent,
  addGradeInStore,
  updateStudentInStore,
  updateStudentInAPI,
  updateGradeInStore,
  updateAPI,
  deleteStudents,
  hasInvalidValues: false,
  setHasInvalidValues: (value: boolean) => set({ hasInvalidValues: value }),
  setAllSaved: () => {
    const students = [...get().students];
    students.forEach((s) => {
      s.grades.forEach((g) => {
        g.isSaved = true;
      });
    });
    set({ students });
  },
}));
