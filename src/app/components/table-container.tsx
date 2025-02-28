'use client'
import { getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TableDisplay from './table';
import { Input } from '~/components/ui/input';
import { Hash, Type } from 'lucide-react';

interface Cell {
	id: string;
	rowId: string;
	columnId: string;
	value: string;
	createdAt: string;
}

interface Row {
	id: string;
	tableId: string;
	createdAt: string;
	cells: Cell[];
}

interface Column {
	id: string;
	name: string;
	type: string;
	tableId: string;
	createdAt: string;
}

interface Table {
	id: string;
	name: string;
	baseId: string;
	createdAt: string;
	columns: Column[];
	rows: Row[];
}

type Data = Record<string, { id: string, value: string | number }>;

export default function TableContainer({ tableId }: { tableId: string }) {
	const [data, setData] = useState<Data[]>([]);
	const [columns, setColumns] = useState<ColumnDef<Data>[]>([]);

	const handleCellChange = (cellId: string, columnId: string, value: string | number) => {
		setData((prevData) => {
			const newData = prevData.map((row) => {
				if (row[columnId].id === cellId) {
					return { ...row, [columnId]: { id: cellId, value: value } };
				}
				return row;
			});
			return newData;
		});
	};

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



	const fetchTable = async () => {
		try {
			const response = await axios.get<Table>(`/api/tables`, {
				params: {
					tableId: tableId
				}
			});

			const table = response.data;

			const columnDefs: ColumnDef<Data>[] = table.columns.map((column) => ({
				accessorKey: column.id,
				header: () => (
					<div className="flex items-center gap-2">
						{column.type === 'number' ? <Hash className="w-3" /> : <Type className="w-3" />} {column.name}
					</div>
				),
				cell: ({ getValue, column: col }) => {
					const cellData = getValue() as { id: string, value: string | number };
					return (
						<Input
							type='text'
							// type={column.type === 'number' ? 'number' : 'text'}
							className="w-full h-full focus:border-[#176EE1] pl-3 rounded-none border-none focus:border-solid focus:border-[2px]"
							value={cellData.value as string}
							data-cell-id={cellData.id}
							onChange={(e) => {
								console.log('e.target.value', e.target.value);

								console.log('col', column.id);
								console.log('cellData.id', cellData.id)
								handleCellChange(cellData.id, column.id, e.target.value);

							}}
						/>
					);
				}
			}));

			const rowData: Data[] = table.rows.map((row) => {
				const rowData: Data = {};
				row.cells.forEach((cell) => {
					rowData[cell.columnId] = { id: cell.id, value: cell.value };
				});
				return rowData;
			});


			setColumns(columnDefs);
			setData(rowData);

		} catch (error) {
			console.error('Failed to fetch table', error)
		}
	}

	useEffect(() => {
		void fetchTable()
	}, [tableId])

	if (data.length === 0 || columns.length === 0) {
		return null;
	}

	return (
		<TableDisplay initialColumns={columns} initialData={data} />
	)
}
