'use client'
import { useState } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Plus } from "lucide-react";

export default function TableDisplay() {
  const initialColumns = [
    { accessorKey: "col_1", header: "Column 1" },
    { accessorKey: "col_2", header: "Column 2" },
  ];
  const initialData = [
    { col_1: "Row 1 Col 1", col_2: "Row 1 Col 2" },
    { col_1: "Row 2 Col 1", col_2: "Row 2 Col 2" },
  ];

  const [columns, setColumns] = useState(initialColumns);
  const [data, setData] = useState(initialData);

  const addColumn = () => {
    const newColumn = {
      accessorKey: `col_${columns.length + 1}`,
      header: `Column ${columns.length + 1}`,
    };
    setColumns([...columns, newColumn]);
    setData(data.map(row => ({ ...row, [newColumn.accessorKey]: "" })));
  };

  const addRow = () => {
    const newRow = {};
    columns.forEach(col => newRow[col.accessorKey] = "");
    setData([...data, newRow]);
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      {/* <button onClick={addColumn}>Add Column</button>
      <button onClick={addRow}>Add Row</button> */}
      {/* <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
		
      </table> */}
		  <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} style={{ width: header.getSize() }} className="h-8">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="hover:bg-transparent">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} style={{ width: cell.column.getSize() }} className="h-[40px] p-0">
                  <div className="h-full px-4 flex items-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={columns.length} className="h-[40px] p-0">
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