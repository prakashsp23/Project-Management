// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//     Sheet,
//     SheetClose,
//     SheetContent,
//     SheetDescription,
//     SheetFooter,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
// } from "@/components/ui/sheet"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
// import { format } from "date-fns"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { cn } from "@/lib/utils"
// // import { Button } from "@/components/ui//button"
// import { Calendar } from "@/components/ui/calendar"
// import {
//     Command,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
// } from "@/components/ui/command"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// // import { Input } from "@/components/ui/input"
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover"
// import { toast } from "@/components/ui/use-toast"

// // import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
// const accountFormSchema = z.object({
//     name: z
//         .string()
//         .min(2, {
//             message: "Name must be at least 2 characters.",
//         })
//         .max(30, {
//             message: "Name must not be longer than 30 characters.",
//         }),

//     dob: z.date({
//         required_error: "A date of birth is required.",
//     }),
//     email: z
//         .string({
//             required_error: "Please select an email to display.",
//         })
//         .email(),
//     language: z.string({
//         required_error: "Please select a language.",
//     }),
// })

// type AccountFormValues = z.infer<typeof accountFormSchema>

// // This can come from your database or API.
// const defaultValues: Partial<AccountFormValues> = {
//     // name: "Your name",
//     // dob: new Date("2023-01-23"),
// }

// export function SheetDemo() {
//     const form = useForm<AccountFormValues>({
//         resolver: zodResolver(accountFormSchema),
//         defaultValues,
//     })

//     function onSubmit(data: AccountFormValues) {
//         toast({
//             title: "You submitted the following values:",
//             description: (
//                 <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//                     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//                 </pre>
//             ),
//         })
//     }
//     return (
//         <Sheet>
//             <SheetTrigger asChild>
//                 <Button variant="outline">Update Info</Button>
//             </SheetTrigger>
//             <SheetContent>
//                 <SheetHeader>
//                     <SheetTitle>Edit Name</SheetTitle>
//                     <SheetDescription>
//                         Make changes to your Profile here. Click save when you're done.
//                     </SheetDescription>
//                 </SheetHeader>
//                 <div className="grid gap-4 py-4">
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="name" className="text-right">
//                             Name
//                         </Label>
//                         <Input type="text" id="name" placeholder="Pedro Duarte" className="col-span-3" />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="username" className="text-right">
//                             Username
//                         </Label>
//                         <Input type="text" id="username" placeholder="ryuk69" className="col-span-3" />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                         <Label htmlFor="email" className="text-right">
//                             Email
//                         </Label>
//                         <Input id="email" placeholder="@peduarte" className="col-span-3" />
//                     </div>
//                 </div>
//                 <SheetFooter>
//                     <SheetClose asChild>
//                         <Button type="submit">Save changes</Button>
//                     </SheetClose>
//                 </SheetFooter>
            
//             </SheetContent>
//         </Sheet>
//     )
// }
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon, CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui//button"
import { Calendar } from "@/components/ui/calendar"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { toast } from "@/components/ui/use-toast"

// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
const accountFormSchema = z.object({
    name: z
        .string()
        .min(2, {
            message: "Name must be at least 2 characters.",
        })
        .max(30, {
            message: "Name must not be longer than 30 characters.",
        }),
    username: z.string().min(2, {
            message: "Name must be at least 2 characters.",
        }),
    date: z.date({
        required_error: "A date of birth is required.",
    }),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
    // name: "Your name",
    // date: new Date("2023-01-23"),
}

export function SheetDemo() {
    const form = useForm<AccountFormValues>({
        resolver: zodResolver(accountFormSchema),
        defaultValues,
    })

    function onSubmit(data: AccountFormValues) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Update Info</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Profile</SheetTitle>
                    <SheetDescription>
                        Make changes to your Profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="">Email Address</FormLabel>
                                    <FormControl>
                                        <Input placeholder="abc@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter> 
                {/* <Button type="submit">Update account</Button> */}
            </form>
        </Form>
                </div>
                {/* <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose>
                </SheetFooter> */}
            
            </SheetContent>
        </Sheet>
    )
}
