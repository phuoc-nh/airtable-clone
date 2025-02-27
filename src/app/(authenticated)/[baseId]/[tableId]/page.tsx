import { ChevronDown, Clock, HelpCircle, Plus, Share2 } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import TableTabs from '~/app/components/create-table-button'
import TableDisplay from '~/app/components/table'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'
import { db } from '~/server/db'

export default async function page({ params }: { params: { baseId: string, tableId: string } }) {
	const tables = await db.table.findMany({
		where: {
			baseId: params.baseId
		}
	});

	const createNewTable = async () => {
		'use server'
		const count = await db.table.count({
			where: {
				baseId: params.baseId
			}
		});

		// const newTable = await db.table.create({
		// 	data: {
		// 		name: `Table ${count + 1}`,
		// 		baseId: params.baseId,
		// 		columns: {
		// 			create: [
		// 				{ name: "Column 1", type: "text" },
		// 				{ name: "Column 2", type: "number" },
		// 				{ name: "Column 3", type: "text" }
		// 			]
		// 		},
		// 		rows: {
		// 			create: [
		// 				{ cells
		// 					: [] }
		// 			]
		// 		}
		// 	},
		// 	include: { columns: true, rows: { include: { cells: true } } }
		// });
		const newTable = await db.table.create({
			data: {
				name: `Table ${count + 1}`,
				baseId: params.baseId,
				columns: {
					create: [
						{ name: "Column 1", type: "text" },
						{ name: "Column 2", type: "number" },
						{ name: "Column 3", type: "text" }
					]
				},
			},
			include: { columns: true }
		});


		redirect(`/${params.baseId}/${newTable.id}`);
	};


	return (
		<div className='flex flex-col h-full'>
			<div className="flex flex-col">
				<header className="bg-[#C84A21] text-white">
					<div className="flex items-center h-14 px-4 gap-8">
						<div className="flex items-center gap-2">
							<div className="w-6 h-6 bg-white/20 rounded" />
							<div className="flex items-center gap-2">
								<span className="font-semibold">Untitled Base</span>
								<ChevronDown className="w-4 h-4 opacity-60" />
							</div>
						</div>
						<nav className="hidden md:flex items-center gap-6">
							<Link className="text-sm hover:opacity-80" href="#">
								Data
							</Link>
							<Link className="text-sm hover:opacity-80" href="#">
								Automations
							</Link>
							<Link className="text-sm hover:opacity-80" href="#">
								Interfaces
							</Link>
							<Link className="text-sm hover:opacity-80" href="#">
								Forms
							</Link>
						</nav>
						<div className="flex items-center gap-2 ml-auto">
							<Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
								<Clock className="w-4 h-4" />
							</Button>
							<Button size="icon" variant="ghost" className="text-white hover:bg-white/20">
								<HelpCircle className="w-4 h-4" />
							</Button>
							<Button className="bg-white/20 hover:bg-white/30 text-white text-sm h-8" variant="ghost">
								Upgrade
							</Button>
							<Button className="bg-white/20 hover:bg-white/30 text-white text-sm h-8 gap-2" variant="ghost">
								<Share2 className="w-4 h-4" />
								Share
							</Button>
							<Avatar className="w-8 h-8">
								<AvatarFallback className="bg-white/20 text-white">P</AvatarFallback>
							</Avatar>
						</div>
					</div>
				</header>
				<TableTabs createNewTable={createNewTable} tables={tables} curTable={params.tableId} baseId={params.baseId} />
			</div>
			<TableDisplay></TableDisplay>
		</div>

	)
}



