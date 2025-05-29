import { Column, flexRender, Table } from "@tanstack/react-table";
import { FunctionComponent, useContext, useState } from "react";
import { StudentRow } from "../../store/students/interfaces/StudentRow";
import { themeContext } from "../../context/ThemeContext";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import InputCheckbox from "./InputCheckbox";
import { useSelectedBox } from "./selectedBoxes";
import { t } from "i18next";
import ColumnOptions from "./ColumnOptions";
import { Assessment } from "../../store/assessments/interfaces/Assessment";
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    assessment?: Assessment;
  }
}
interface TheadProps {
  table: Table<StudentRow>;
  loading: boolean;
  onRecoveryAdded?: () => void;
}

/**
 * Table header component for student data tables
 *
 * @param {object} props - Component properties
 * @param {Table<StudentRow>} props.table - TanStack Table instance
 * @param {boolean} props.loading - Loading state flag
 * @returns {JSX.Element} The rendered table header
 */
export const Thead: FunctionComponent<TheadProps> = ({
  table,
  loading,
}): JSX.Element => {
  const { theme } = useContext(themeContext);
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false);
  const { setAllBoxes } = useSelectedBox();

  const handleSelectedAll = () => {
    const newSelectedState = !isSelectedAll;
    setIsSelectedAll(newSelectedState);

    const rows = table.getRowModel().rows;
    const allBoxes: Record<string, boolean> = {};

    rows.forEach((row) => {
      allBoxes[row.original.id] = newSelectedState;
    });
    allBoxes.head = !isSelectedAll;
    setAllBoxes(allBoxes);
  };

  const handleSortAsc = (column: Column<StudentRow>) => {
    column.toggleSorting(false);
  };

  const handleSortDesc = (column: Column<StudentRow>) => {
    column.toggleSorting(true);
  };

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>
          {!loading && (
            <th
              className={`font-bold min-w-10 ${
                theme === "dark" ? "bg-dark" : "bg-stone-200 "
              }`}
            >
              <InputCheckbox id="head" handleChange={handleSelectedAll} />
            </th>
          )}

          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className={`p-2 min-w-20 ${
                theme === "dark" ? "bg-dark" : "bg-stone-200"
              } `}
            >
              {header.id != "name" &&
                header.id != "total" &&
                header.column.columnDef.meta?.assessment?.isRecovery != true &&
                header.column.columnDef.meta?.assessment && (
                  <ColumnOptions
                    assessment={header.column.columnDef.meta.assessment}
                  />
                )}

              {flexRender(header.column.columnDef.header, header.getContext())}

              <div className="w-full flex justify-center">
                <BsCaretDownFill
                  onClick={() => handleSortDesc(header.column)}
                  className={`cursor-pointer ${
                    header.column.getIsSorted() === "desc"
                      ? `${theme === "dark" ? "text-first" : "text-second"}`
                      : "text-stone-600"
                  }`}
                />
                <BsCaretUpFill
                  onClick={() => handleSortAsc(header.column)}
                  className={`cursor-pointer ${
                    header.column.getIsSorted() === "asc"
                      ? `${theme === "dark" ? "text-first" : "text-second"}`
                      : "text-stone-600"
                  }`}
                />
              </div>
            </th>
          ))}
          <th
            className={`font-bold min-w-24 px-3 ${
              theme === "dark" ? "bg-dark" : "bg-stone-200 "
            }`}
          >
            {t("table.assessment.add")}
          </th>
        </tr>
      ))}
    </thead>
  );
};

export default Thead;
