import {
  FunctionComponent,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import { useStudentStore } from "../../store/students/students";
import { StudentRow } from "../../store/students/interfaces/StudentRow";
import { Cell, Row } from "@tanstack/react-table";
import { updateStudentInStore } from "../../store/students/functions/updateStudentInStore";
import { Grade } from "../../store/students/interfaces/Grade";
import { Student } from "../../store/students/interfaces/Student";
import { themeContext } from "../../context/ThemeContext";
import { DetailError } from "../utils/DetailError";
import { t } from "i18next";

interface TdProps {
  cell: Cell<StudentRow, unknown>;
  groupId: string;
  row: Row<StudentRow>;
}

/**
 * Component that renders an editable table body cell.
 *
 * Features:
 * - Renders an editable input field for student names or grades
 * - Performs validation based on maximum allowed values
 * - Shows error messages for invalid inputs
 * - Updates student store on value changes
 * - Prevents saving when invalid values are present
 *
 * @param {TdProps} props - Cell properties
 * @param {Cell<StudentRow, unknown>} props.cell - The cell data
 * @param {string} props.groupId - ID of the student group
 * @param {Row<StudentRow>} props.row - The row data
 *
 * @example
 * <Td
 *    cell={cell}
 *    groupId={groupId}
 *    row={row}
 * />
 *
 * @returns {JSX.Element}
 */
export const Td: FunctionComponent<TdProps> = ({
  cell,
  groupId,
  row,
}: TdProps): JSX.Element => {
  const {
    setIsSaved,
    updateGradeInStore,
    addGradeInStore,
    setHasInvalidValues,
  } = useStudentStore();
  const { theme } = useContext(themeContext);
  const [isInvalidGrade, setIsInvalidGrade] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | number>(
    cell.getValue() === 0 ? "" : (cell.getValue() as string | number)
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const maxValue =
    (cell.column.columnDef.meta as { maxValue: number })?.maxValue ?? Infinity;

  useEffect(() => {
    setInputValue(
      cell.getValue() === 0 ? "" : (cell.getValue() as string | number)
    );
    setIsInvalidGrade(false);
  }, [cell.getValue()]);

  const validateValue = (value: string) => {
    if (value === "") return true;

    const numValue = Number(value);

    if (isNaN(numValue)) return false;

    if (numValue > maxValue) {
      setIsInvalidGrade(true);
      setHasInvalidValues(true);
      return false;
    }

    setHasInvalidValues(false);
    setIsInvalidGrade(false);
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    const isValid = validateValue(newValue);

    if (!isValid && cell.column.id !== "name") {
      return;
    }

    const gradeId =
      cell.column.id !== "name"
        ? row.original.grades.find(
            (grade) => grade.assessmentId === cell.column.id
          )?.id || ""
        : "";

    handleInputTableChange(gradeId, newValue, cell.column.id, row.original.id);
  };

  const handleInputBlur = () => {
    if (isInvalidGrade && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  };

  const handleInputTableChange = (
    id: string,
    value: string,
    assessmentId: string,
    studentId: string
  ) => {
    if (assessmentId === "name") {
      const updatedStudent: Student = {
        id: studentId,
        name: value,
        groupId,
        isSaved: false,
      };

      updateStudentInStore(updatedStudent);
      setIsSaved(false);
      return;
    }

    const grade: Grade = {
      id,
      value: value === "" ? 0 : Number(value),
      isSaved: false,
      assessmentId,
      studentId,
    };

    if (id !== "") {
      updateGradeInStore(grade);
    } else {
      grade.id = `temp-${Math.random().toString(36).substr(2, 9)}`;
      addGradeInStore(grade);
    }

    setIsSaved(false);
  };

  return (
    <td
      key={cell.id}
      className={`relative border text-center ${
        theme === "dark" ? "border-dark" : "border-stone-200"
      }`}
    >
      {isInvalidGrade && (
        <DetailError>
          {t("table.maximumValue") + " "}
          {maxValue}
        </DetailError>
      )}
      <input
        ref={inputRef}
        type={cell.column.id === "name" ? "text" : "number"}
        min={cell.column.id !== "name" ? 0 : undefined}
        max={
          cell.column.id !== "name" && cell.column.id !== "total"
            ? maxValue
            : undefined
        }
        readOnly={cell.column.id === "total"}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        className={`no-arrows p-2 bg-transparent text-center w-full outline-none 
                    ${
                      isInvalidGrade
                        ? "border-red-500 text-red-500 font-bold"
                        : ""
                    }
                    ${theme === "dark" ? "focus:bg-first" : "focus:bg-second"} 
                    ${
                      theme === "dark"
                        ? "focus:text-third"
                        : "focus:text-light-100"
                    }`}
      />
    </td>
  );
};
