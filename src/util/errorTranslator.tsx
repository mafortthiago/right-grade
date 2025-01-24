export interface ErrorMessages {
  incorrectName?: string;
  invalidPassword?: string;
  invalidEmail?: string;
  incorrectTeacher?: string;
  incorrectGradeType?: string;
  incorrectMinimumGrade?: string;
}
export const errorTranslator = (
  error: {
    email?: string;
    name?: string;
    gradeType?: string;
    teacherId?: string;
    minimumGrade?: string;
    password?: string;
  },
  errorMessages: ErrorMessages
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
  // Verify if the email property exists and is a string
  if (error.email && typeof error.email === "string") {
    error.email = errorMessages.invalidEmail;
  }
  // Verify if the password property exists and is a string
  if (error.password && typeof error.password === "string") {
    error.password = errorMessages.invalidPassword;
  }
  return error;
};
