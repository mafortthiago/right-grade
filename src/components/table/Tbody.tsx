import { FunctionComponent, useContext } from "react";
import { Student } from "../../store/students/interfaces/Student";
import { useStudentStore } from "../../store/students/students";
import { themeContext } from "../../context/ThemeContext";
import { TdAddAssessmemt } from "./TdAddAsssessment";
import { addStudent } from "../../store/students/functions/addStudent";
import { StudentRow } from "../../store/students/interfaces/StudentRow";
import { Column, Table } from "@tanstack/react-table";
import InputCheckbox from "./InputCheckbox";
import { Td } from "./Td";
import { t } from "i18next";

interface TbodyProps {
  setAddAssessmentIsVisible: (value: boolean) => void;
  groupId: string;
  table: Table<StudentRow>;
  columns: Array<Column<StudentRow>>;
  loading: boolean;
}

export const Tbody: FunctionComponent<TbodyProps> = ({
  setAddAssessmentIsVisible,
  groupId,
  table,
  columns,
  loading,
}) => {
  const { theme } = useContext(themeContext);
  const { students } = useStudentStore();
  const handleAddAssessment = () => {
    setAddAssessmentIsVisible(true);
  };

  const handleAddStudent = async () => {
    const newStudent: Student = {
      id: "",
      name: t("table.student.new"),
      groupId,
    };
    await addStudent(newStudent);
  };

  return (
    <tbody>
      {table.getRowModel().rows.map((row, rowIndex) => (
        <tr
          key={row.id}
          className={`${
            theme === "dark"
              ? "even:bg-fourth border-dark"
              : "even:bg-stone-100 border-stone-200"
          } `}
        >
          {!loading && (
            <td className="text-center">
              <InputCheckbox id={row.original.id} />
            </td>
          )}
          {row.getVisibleCells().map((cell) => (
            <Td cell={cell} groupId={groupId} row={row} />
          ))}
          {rowIndex == 0 && (
            <TdAddAssessmemt
              handleClick={handleAddAssessment}
              loading={loading}
              table={table}
            />
          )}
        </tr>
      ))}
      <tr>
        <td
          colSpan={columns.length + 1}
          className={`cursor-pointer border text-center py-2 font-bold ${
            theme === "dark"
              ? "border-dark hover:bg-fourth text-first"
              : "hover:bg-light-200 text-second"
          }
          ${loading && "opacity-50"}
          `}
          onClick={!loading ? handleAddStudent : undefined}
        >
          {t("table.student.add")}
        </td>
        {students.length == 0 && (
          <TdAddAssessmemt
            handleClick={handleAddAssessment}
            loading={loading}
            table={table}
          />
        )}
      </tr>
    </tbody>
  );
};
