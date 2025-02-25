'use client'
import { useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Plus } from "lucide-react";
import { FieldPopover } from "./add-field-popover";

export default function TableDisplay() {
  const initialColumns = [
    { accessorKey: "col_1", header: "Column 1" },
    { accessorKey: "col_2", header: "Column 2" },
    { accessorKey: "col_3", header: "Column 3" },
    { accessorKey: "col_4", header: "Column 4" },
  ];
  const initialData = [
    { col_1: "Row 1 Col 1", col_2: "Row 1 Col 2", col_3: "abc", col_4: "def" },
    { col_1: "Row 1 Col 1", col_2: "Row 1 Col 2", col_3: "abc", col_4: "def" },
    { col_1: "Row 1 Col 1", col_2: "Row 1 Col 2", col_3: "abc", col_4: "def" },
    { col_1: "Row 1 Col 1", col_2: "Row 1 Col 2", col_3: "abc", col_4: "def" },
    { col_1: "Row 1 Col 1", col_2: "Row 1 Col 2", col_3: "abc", col_4: "def" },
    { col_1: "Row 1 Col 1", col_2: "Row 1 Col 2", col_3: "abc", col_4: "def" },
  ];

  const [columns, setColumns] = useState(initialColumns);
  const [data, setData] = useState(initialData);

  const addColumn = (fieldName: string, fieldType: string) => {
    console.log('fieldType', fieldType);
    const newColumn = {
      accessorKey: `col_${columns.length + 1}`,
      header: fieldName || `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
    setData(data.map(row => ({ ...row, [newColumn.accessorKey]: "" })));
  };

  // const addRow = () => {
  //   const newRow = {};
  //   // @ts-ignore
  //   columns.forEach(col => newRow[col.accessorKey] = "");
  //   // @ts-ignore
  //   setData([...data, newRow]);
  // };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const cellWidth = 150; // Fixed width for each cell
  const tableWidth = (columns.length + 1) * cellWidth; // Scale table width based on columns count

  return (
    <div className="overflow-x-auto">
      <Table className="border-collapse border border-gray-300 border-r-0 border-b-0 text-xs" style={{ width: tableWidth }}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent bg-gray-100">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} style={{ width: cellWidth }} className="h-8 border border-gray-300">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
              <TableHead style={{ width: cellWidth }} className="h-8 border border-gray-300">
                <FieldPopover onCreateField={addColumn}>
                  <button className="flex items-center justify-center w-full h-full">
                    <Plus className="w-4 h-4 text-gray-400" />
                  </button>
                </FieldPopover>
              </TableHead>
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="hover:bg-gray-100 border-none">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} style={{ width: cellWidth }} className="h-[30px] p-0 border border-gray-300 ">
                  <div className="h-full px-4 flex items-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={columns.length} className="h-[30px] p-0 border border-gray-300">
              <div className="h-full px-4 flex items-center">
                <Plus className="w-4 h-4 text-gray-400" />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}