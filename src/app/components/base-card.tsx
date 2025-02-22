import React from 'react'
import { Card } from '~/components/ui/card'

export default function BaseCard() {
	return (
		<Card className="flex items-start gap-4 mt-3 p-4">
			<div className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#F6B73C] text-white text-2xl font-medium">
				Te
			</div>
			<div className="flex flex-col gap-1">
				<h2 className="font-medium">Test Base</h2>
				<p className="text-sm text-muted-foreground">Base opened 1 minute ago</p>
			</div>
		</Card>
	)
}
