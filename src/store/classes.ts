import { create } from "zustand";
interface Groups {
  groups: Group[];
  createGroup: (
    group: Group,
    token: string,
    errorMessages: ClassErrorMessages,
    onError: (error: string) => void
  ) => void;
}

export interface ClassErrorMessages {
  incorrectName: string;
  incorrectGradeType: string;
  incorrectTeacher: string;
  incorrectMinimumGrade: string;
}

export interface Group {
  name: string;
  gradeType: boolean;
  teacherId: string;
  minimumGrade: number;
}

export const useClassStore = create<Groups>(() => ({
  groups: [],
  createGroup: async (
    group: Group,
    token: string,
    errorMessages: ClassErrorMessages,
    onError: (error: string) => void
  ) => {
    try {
      console.log(group);
      console.log(token);
      const response = await fetch("http://localhost:8080/groups", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(group),
      });
      if (response.status != 201) {
        const errorBody = await response.json();
        throw new Error(JSON.stringify(errorBody));
      }
    } catch (error: any) {
      let dataError = JSON.parse(error.message);
      let translatedErrors: any = errorTranslator(dataError, errorMessages);
      onError(translatedErrors);
    }
  },
}));

const errorTranslator = (
  error: {
    name?: string;
    gradeType?: string;
    teacherId?: string;
    minimumGrade?: string;
  },
  errorMessages: ClassErrorMessages
) => {
  // Verify if the name property exists and is a string
  if (error.name && typeof error.name === "string") {
    error.name = errorMessages.incorrectName;
  }
  // Verify if the gradeType property exists and is a string
  if (error.gradeType && typeof error.gradeType === "string") {
    error.gradeType = errorMessages.incorrectGradeType;
  }
  // Verify if the teacherId property exists and is a string
  if (error.teacherId && typeof error.teacherId === "string") {
    error.teacherId = errorMessages.incorrectTeacher;
  }
  // Verify if the minimumGrade property exists and is a string
  if (error.minimumGrade && typeof error.minimumGrade === "string") {
    error.minimumGrade = errorMessages.incorrectMinimumGrade;
  }
  return error;
};
