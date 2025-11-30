import {
    Command,
    // CommandDialog,
    // CommandEmpty,
    // CommandGroup,
    CommandInput,
    // CommandItem,
    // CommandList,
    // CommandSeparator,
    // CommandShortcut,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"

export default function SearchForm() {
    return (
        <div className="flex flex-col md:flex-row gap-2 py-8 place-content-center space-y-3">
            <Command className="bg-neutral-800/70 backdrop-blur-xl rounded-2xl md:max-w-[590] xl:max-w-[526px] h-[56px] place-content-center">
                <CommandInput placeholder="Type a command or search..." className="text-xl"/>
            </Command>
            <Button className="md:ml-4 bg-w-blue-500 h-[56px] md:w-[114px] text-xl">Search</Button>
        </div>
    )
}