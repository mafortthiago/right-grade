import { FunctionComponent, useState, useMemo } from "react";
import fakeData from "../fakeData.json";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import InputTable from "../components/InputTable";

const Class: FunctionComponent = () => {
  interface User {
    name: string;
    grade1: number;
    grade2: number;
    grade3: number;
    finalGrade: number;
  }

  const [data, setData] = useState<User[]>(fakeData as User[]);

  const updateData = (rowIndex: number, columnId: string, value: any) => {
    setData((oldData) =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        cell: ({ row, getValue }) => (
          <InputTable
            value={getValue() as string}
            onChange={(e) => updateData(row.index, "name", e.target.value)}
          />
        ),
      },
      {
        header: "Grade 1",
        accessorKey: "grade1",
        cell: ({ row, getValue }) => (
          <InputTable
            value={getValue() as number}
            onChange={(e) =>
              updateData(row.index, "grade1", Number(e.target.value))
            }
          />
        ),
      },
      {
        header: "Grade 2",
        accessorKey: "grade2",
        cell: ({ row, getValue }) => (
          <InputTable
            value={getValue() as number}
            onChange={(e) =>
              updateData(row.index, "grade2", Number(e.target.value))
            }
          />
        ),
      },
      {
        header: "Grade 3",
        accessorKey: "grade3",
        cell: ({ row, getValue }) => (
          <InputTable
            value={getValue() as number}
            onChange={(e) =>
              updateData(row.index, "grade3", Number(e.target.value))
            }
          />
        ),
      },
      {
        header: "Final Grade",
        accessorKey: "finalGrade",
        cell: ({ row, getValue }) => (
          <InputTable
            value={getValue() as number}
            onChange={(e) =>
              updateData(row.index, "finalGrade", Number(e.target.value))
            }
          />
        ),
      },
    ],
    []
  );

  const table = useReactTable<User>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Class;
