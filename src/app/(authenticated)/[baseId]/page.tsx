import { ChevronDown, Clock, HelpCircle, Plus, Share2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import TableDisplay from '~/app/components/table'
import { Avatar, AvatarFallback } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export default function page() {

	const isActive = true;

	return (
		<div>
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
			<div className="flex items-center h-10 px-4  border-b bg-[#C03D05]">
				<div className={
					cn(
						"text-sm h-10 gap-2 text-white flex justify-between items-center p-3",
						{ "bg-white text-black rounded-t-sm": isActive })
				} >
					Table 1
					<ChevronDown className="w-4 h-4 opacity-60" />
				</div>
				<div className="text-sm h-10 gap-2 text-white flex justify-between items-center hover:bg-white hover:text-black hover:rounded-t-sm p-3" >
					Table 2
					<ChevronDown className="w-4 h-4 opacity-60" />
				</div>
				<Button size="icon" variant="ghost" className="h-8 w-8 text-white">
					<Plus className="w-4 h-4" />
				</Button>
				<div className="ml-auto flex items-center gap-2">
					<Button variant="ghost" className="h-8 text-white">
						Extensions
					</Button>
					<Button variant="ghost" className="h-8">
						Tools
					</Button>
				</div>
			</div>
		</div>
		<TableDisplay></TableDisplay>
		</div>
		
	)
}
