import Link from "next/link"
import { MoreHorizontal, Star } from "lucide-react"
import { Button } from "~/components/ui/button"
import StartModal from "./start-modal"
import { Badge } from "~/components/ui/badge"
import { Card } from "~/components/ui/card"
import BaseCard from "./base-card"

export default function Workspace() {
	return (
		<Link href="#" className="block rounded-lg border bg-background p-7  transition-colors">
			<div className="flex flex-col gap-4 mb-5">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-4">
						<h1 className="text-xl font-semibold">Workspace</h1>
						<div className="flex items-center gap-2">
							<Badge variant="outline">
								FREE PLAN
							</Badge>
							<Badge variant="outline" className="text-blue-400">
								UPGRADE
							</Badge>	
						</div>
						<button className="text-muted-foreground hover:text-foreground">
							<Star className="h-5 w-5" />
						</button>
					</div>

					<div className="flex items-center gap-2">
						<StartModal>
							<Button variant="outline" size="sm">Start</Button>
						</StartModal>
						<Button variant="outline" size="sm">Share</Button>
						<Button variant="ghost" size="icon">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
			<div className="grid grid-cols-3 gap-3">
			<BaseCard></BaseCard>
			<BaseCard></BaseCard>
			<BaseCard></BaseCard>
			</div>

		</Link>
	)
}