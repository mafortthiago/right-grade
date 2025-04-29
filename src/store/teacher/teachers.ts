import { create } from "zustand";
import { TeacherStore } from "./interfaces/TeacherStore";
import { URL_API } from "../URL_API";
import { getTeacherById } from "./functions/getTeacherById";
import { updateName } from "./functions/updateName";
import { validatePassword } from "./functions/validatePassword";
import { updatePassword } from "./functions/updatePassword";
export const URL_API_TEACHERS = URL_API + "/teachers";

export const useTeacherStore = create<TeacherStore>(() => ({
  updatePasswordCode: "",
  teacher: { name: "Name", email: "email" },
  getTeacherById,
  updateName,
  updatePassword,
  validatePassword,
}));
