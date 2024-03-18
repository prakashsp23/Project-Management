import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./button"
import { Label } from "./label"
import { Input } from "./input"
import { CirclePlus } from 'lucide-react';
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
export default function NewProjectCard() {
    const pathname = usePathname()
    return (
        <div className="flex justify-center items-center">
            <Dialog>
                <DialogTrigger asChild >
                    <Button variant="outline" className=""><CirclePlus /></Button>
                    {/* <h1>Add New Project</h1> */}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New Project</DialogTitle>
                        <DialogDescription>
                            Let's get you started.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Name
                            </Label>
                            <Input
                                id="name"
                                // defaultValue="Pedro Duarte"
                                placeholder="Project Name"
                                className="col-span-3"
                            />
                        </div>
                        {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input
                            id="username"
                            // defaultValue="@peduarte"
                            // placeholder="Project Name"
                            // label="Project Name"
                            className="col-span-3"
                        />
                    </div> */}
                    </div>
                    <DialogFooter>
                        <Link
                            href="/synopsis"
                            // className={cn(
                            //     "transition-colors hover:text-foreground/100 px-4 flex items-center hover:transition hover:border-b-2  ",
                            //     pathname?.startsWith("/synopsis")
                            //         ? "text-foreground"
                            //         : "text-foreground/60"
                            // )}
                        >
                            <Button type="submit">Begin</Button>
                        </Link>
                    </DialogFooter>
                </DialogContent>
            </Dialog></div>
    )
}