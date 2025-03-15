import { Teacher } from "./Teacher";

export interface TeacherStore {
  teacher: Teacher;
  getTeacherById: () => Promise<Teacher>;
  updateName: (name: string) => Promise<void>;
  validatePassword: (newPassword: string, email: string) => Promise<void>;
  updatePassword: (
    newPassword: string,
    email: string,
    code: string
  ) => Promise<void>;
}
