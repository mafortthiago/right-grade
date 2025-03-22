import {
  Column,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { FormEvent, FunctionComponent, useEffect, useState } from "react";
import InputSearch from "../InputSearch";
import { useAssessmentStore } from "../../store/assessments/assessments";
import { Assessment } from "../../store/assessments/interfaces/Assessment";
import AddAssessment from "./AddAssessment";
import { useStudentStore } from "../../store/students/students";
import { StudentRow } from "../../store/students/interfaces/StudentRow";
import Thead from "./Thead";
import { Tbody } from "./Tbody";
import { t } from "i18next";

interface TableProps {
  gradingPeriodId: string;
  groupId: string;
}

const Table: FunctionComponent<TableProps> = ({ gradingPeriodId, groupId }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const { getAssessments, assessments } = useAssessmentStore();
  const { getStudentRows, students } = useStudentStore();
  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [addAssessmentIsVisible, setAddAssessmentIsVisible] =
    useState<boolean>(false);
  const [columns, setColumns] = useState<Array<Column<StudentRow>>>([]);

  useEffect(() => {
    const loadTable = async () => {
      setLoading(true);
      const assessments = await getAssessments(gradingPeriodId);
      assessments.push({
        id: "total",
        name: "Total",
        value: 100,
        gradingPeriodId,
      });
      await getStudentRows(groupId);
      const columnHelper = createColumnHelper<StudentRow>();
      const updatedAssessments: Assessment[] = assessments;
      const dynamicColumns: any = [
        columnHelper.accessor("name", {
          header: () => "Nome",
          cell: (info) => info.getValue(),
        }),
        ...updatedAssessments.map((assessment, index) =>
          columnHelper.accessor(
            (row) => {
              return (
                row.grades.find((grade) => grade.assessmentId === assessment.id)
                  ?.value ?? 0
              );
            },
            {
              id: assessment.id || `assessment-${index}`,
              header: () => (
                <>
                  {assessment.name}
                  <p className="font-normal text-sm">
                    {t("table.assessment.value")}:{" "}
                    <span>{assessment.value}</span>
                  </p>
                </>
              ),
              cell: (info) => info.getValue(),
              meta: {
                maxValue: assessment.value,
              },
            }
          )
        ),
      ];
      setColumns(dynamicColumns);
      setLoading(false);
    };

    loadTable();
  }, [gradingPeriodId, assessments]);

  const fuzzyFilter = (row: any, columnId: string, filterValue: string) => {
    if (columnId === "name") {
      return row
        .getValue(columnId)
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    }
    return false;
  };

  const table = useReactTable({
    data: students,
    columns,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: searchValue,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setSearchValue,
    globalFilterFn: fuzzyFilter,
  });

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="flex justify-center sm:absolute top-2 left-3">
        <InputSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleClick={handleSearch}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse mt-2 ">
          <Thead table={table} loading={loading} />
          <Tbody
            setAddAssessmentIsVisible={setAddAssessmentIsVisible}
            groupId={groupId}
            table={table}
            columns={columns}
            loading={loading}
          />
        </table>
      </div>
      {addAssessmentIsVisible && (
        <AddAssessment
          setIsAddVisible={setAddAssessmentIsVisible}
          loading={loading}
          setLoading={setLoading}
          gradingPeriodId={gradingPeriodId}
        />
      )}
    </>
  );
};

export default Table;
