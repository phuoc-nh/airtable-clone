"use client"

import * as React from "react"
import { Type, ChevronRight, Hash } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "~/components/ui/command"

const fieldTypes = [
  {
    id: "number",
    name: "Number",
    icon: Hash,
  },
  {
    id: "single-line",
    name: "Single line text",
    icon: Type,
  },
  
]

export function FieldPopover({children, onCreateField}: {children: React.ReactNode, onCreateField: (fieldName: string, fieldType: string) => void}) {
  const [open, setOpen] = React.useState(false)
  const [fieldName, setFieldName] = React.useState("")
  const [selectedFieldType, setSelectedFieldType] = React.useState<string | null>(null)

  const handleCreateField = () => {
    if (selectedFieldType) {
      onCreateField(fieldName, selectedFieldType);
      setOpen(false);
    }
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <div className="space-y-4 p-4">
          <Input
            placeholder="Field name (optional)"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            className="border-primary"
          />
          <Command className="rounded-lg border shadow-none">
            <CommandInput placeholder="Find a field type" value={selectedFieldType ?? ""} />
            <CommandList className="max-h-[320px]">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {fieldTypes.map((type) => (
                  <CommandItem
                    key={type.id}
                    className="flex items-center justify-between"
                    onSelect={() => setSelectedFieldType(type.id)}
                  >
                    <div className="flex items-center gap-2">
                      <type.icon className="h-4 w-4" />
                      <span>{type.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
        <div className="flex items-center justify-between border-t p-4">
          <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleCreateField}>
            Create field
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
