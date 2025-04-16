import {
  Column,
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
  useCallback,
} from "react";
import InputSearch from "../InputSearch";
import { useAssessmentStore } from "../../store/assessments/assessments";
import { Assessment } from "../../store/assessments/interfaces/Assessment";
import AddAssessment from "./AddAssessment";
import { useStudentStore } from "../../store/students/students";
import { StudentRow } from "../../store/students/interfaces/StudentRow";
import Thead from "./Thead";
import { Tbody } from "./Tbody";
import { t } from "i18next";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    maxValue?: number;
    assessment?: Assessment;
  }
}

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

  const searchContainerClasses = "flex justify-start sm:absolute top-2 left-3";
  const tableWrapperClasses = "overflow-x-auto";
  const tableClasses = "w-full border-collapse mt-2";

  const generateColumns = useCallback(() => {
    const columnHelper = createColumnHelper<StudentRow>();
    const assessmentsWithTotal = [...assessments];

    if (!assessmentsWithTotal.find((a) => a.id === "total")) {
      assessmentsWithTotal.push({
        id: "total",
        name: "Total",
        value: 100,
        gradingPeriodId,
      });
    }

    const dynamicColumns: any = [
      columnHelper.accessor("name", {
        header: () => "Nome",
        cell: (info) => info.getValue(),
      }),
      ...assessmentsWithTotal.map((assessment, index) =>
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
                  {t("table.assessment.value")}: <span>{assessment.value}</span>
                </p>
              </>
            ),
            cell: (info) => info.getValue(),
            meta: {
              maxValue: assessment.value,
              assessment,
            },
          }
        )
      ),
    ];

    setColumns(dynamicColumns);
  }, [assessments, gradingPeriodId]);

  const loadInitialData = useCallback(async () => {
    setLoading(true);
    await getAssessments(gradingPeriodId);
    await getStudentRows(groupId, gradingPeriodId);
    setLoading(false);
  }, [gradingPeriodId, groupId, getAssessments, getStudentRows]);

  useEffect(() => {
    loadInitialData();
  }, [gradingPeriodId, groupId, loadInitialData]);

  useEffect(() => {
    generateColumns();
  }, [assessments, generateColumns]);

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
      <div className={searchContainerClasses}>
        <InputSearch
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleClick={handleSearch}
        />
      </div>
      <div className={tableWrapperClasses}>
        <table className={tableClasses}>
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
