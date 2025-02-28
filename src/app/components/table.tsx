'use client'
import { useEffect, useRef, useState } from "react";
import { useReactTable, getCoreRowModel, flexRender, type ColumnDef } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { ChevronDown, Hash, Plus, Type } from "lucide-react";
import { FieldPopover } from "./add-field-popover";
import { Input } from "~/components/ui/input";
import { type Data } from "./table-container";

type TableProps = {
  initialColumns: ColumnDef<Data>[],
  initialData: Data[]
  addColumn: (fieldName: string, fieldType: string) => void
}

export default function TableDisplay({ initialColumns, initialData, addColumn }: TableProps) {

  // const addColumn = (fieldName: string, fieldType: string) => {
  //   const newColumn: ColumnDef<Data> = {
  //     accessorKey: `col_${columns.length + 1}`,
  //     header: () => fieldType === 'number' ?
  //       <div className="flex items-center gap-2">
  //         <Hash className="w-3" /> {fieldName}
  //       </div> :
  //       <div className="flex items-center gap-2">
  //         <Type className="w-3" /> {fieldName}
  //       </div>,
  //     cell: ({ getValue, row }) => {
  //       const cellData = getValue() as { id: string, value: string | number };
  //       return (
  //         <Input
  //           type={fieldType === 'number' ? 'number' : 'text'}
  //           className="w-full h-full focus:border-[#176EE1] pl-3 rounded-none border-none focus:border-solid focus:border-[2px]"
  //           value={cellData.value as string}
  //           data-cell-id={cellData.id}
  //           onChange={(e) => handleCellChange(row.index, `col_${columns.length + 1}`, e.target.value)}
  //         />
  //       );
  //     }
  //   };
  //   setColumns([...columns, newColumn]);
  //   setData(data.map(row => ({ ...row, [newColumn.accessorKey as string]: { id: `cell_${row.id}_${columns.length + 1}`, value: fieldType === 'number' ? 0 : "" } })));
  // };

  const table = useReactTable({
    data: initialData,
    columns: initialColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  const cellWidth = 200; // Fixed width for each cell
  const tableWidth = (initialColumns.length + 1) * cellWidth; // Scale table width based on columns count

  const divRef = useRef<HTMLDivElement>(null);
  const [rows, setRows] = useState(0);

  useEffect(() => {
    if (divRef.current) {
      const tableHeight = initialData.length * 30 + 30;
      const remainingHeight = divRef.current.clientHeight - tableHeight;
      if (remainingHeight < 0) {
        setRows(4);
        return;
      }
      const rows = Math.floor(remainingHeight / 30);
      setRows(rows - 2);
    }
  }, []);

  return (
    <div className="overflow-x-auto bg-[#F7F7F7] flex flex-grow h-full" ref={divRef}>
      <Table className="border-collapse border border-gray-300 border-r-0 border-b-0 text-xs " style={{ width: tableWidth }}>
        <TableHeader className="sticky top-0 bg-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent bg-gray-100 bg-red">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} style={{ width: cellWidth }} className="h-8 border border-gray-300 ">
                  <div className="flex flex-row justify-between items-center">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    <ChevronDown className="w-3" />
                  </div>
                </TableHead>
              ))}
              <TableHead style={{ width: cellWidth }} className="h-8 border border-gray-300">
                <FieldPopover onCreateField={addColumn}>
                  {/* <FieldPopover onCreateField={() => { console.log('Create Field') }}> */}
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
                <TableCell key={cell.id} style={{ width: cellWidth }} className="h-[30px] p-0 border border-gray-300 bg-white ">
                  <div className="h-full flex items-center w-full">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          ))}
          <TableRow className="hover:bg-gray-100 border-none">
            <TableCell colSpan={1} className="h-[30px] p-0 border border-gray-300 bg-white">
              <div className="h-full px-4 flex items-center">
                <Plus className="w-4 h-4 text-gray-400" />
              </div>
            </TableCell>
            <TableCell colSpan={initialColumns.length - 1} className="h-[30px] p-0 border border-gray-300 bg-white">
            </TableCell>
          </TableRow>


          <TableRow className="hover:bg-gray-100 border-none">
            <TableCell colSpan={1} rowSpan={rows} className="h-[30px] p-0 border border-gray-300 bg-white">
            </TableCell>
            <TableCell colSpan={initialColumns.length - 1} className="h-[30px] ">
            </TableCell>
          </TableRow>
          {Array.from({ length: rows - 1 }, (_, i) => (
            <TableRow key={i} className="hover:bg-gray-100 border-none">
              <TableCell colSpan={initialColumns.length - 1} className="h-[30px]  ">
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
        <TableFooter className="border-none sticky bottom-0 bg-white">
          <TableRow className="hover:bg-gray-100 border-none">
            <TableCell colSpan={1} className="h-[30px] p-0 border border-gray-300 bg-white">
              <div className="h-full px-4 flex items-center">
                Footer
              </div>
            </TableCell>
            <TableCell colSpan={initialColumns.length - 1} className="h-[30px] p-0 border border-gray-300 bg-white">
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}