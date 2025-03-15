import { Table } from "@tanstack/react-table";
import { FunctionComponent, useContext } from "react";
import { StudentRow } from "../../store/students/interfaces/StudentRow";
import { themeContext } from "../../context/ThemeContext";
import Loading from "../Loading";
import { BsPlusSquareFill } from "react-icons/bs";

interface TddAddAssessment {
  table: Table<StudentRow>;
  handleClick: VoidFunction;
  loading: boolean;
}

export const TdAddAssessmemt: FunctionComponent<TddAddAssessment> = ({
  table,
  handleClick,
  loading,
}) => {
  const { theme } = useContext(themeContext);
  return (
    <td
      rowSpan={table.getRowModel().rows.length}
      className={`cursor-pointer border w-24 ${
        theme === "dark" ? "border-dark hover:bg-fourth" : "hover:bg-light-200"
      }`}
      onClick={handleClick}
    >
      {loading ? (
        <Loading size="small" />
      ) : (
        <BsPlusSquareFill
          className={`w-full h-5 ${
            theme === "dark" ? "text-stone-500" : "text-stone-400"
          }`}
        />
      )}
    </td>
  );
};
