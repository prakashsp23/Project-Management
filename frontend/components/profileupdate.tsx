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
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux"

// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
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
import { useState, useEffect, SyntheticEvent } from "react";
import { useRouter } from "next/navigation"
import { setCredentials } from "@/redux/slices/authSlice"

// type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
// const defaultValues: Partial<AccountFormValues> = {
//     // name: "Your name",
//     // dob: new Date("2023-01-23"),
// }
// import { useUpdateUserMutation } from "@/redux/slices/studentApiSlice"
export function SheetDemo() {
    const { userInfo } = useSelector((state: any) => state.auth);
    const [firstName, setFirstName] = useState<string>(userInfo.profile.firstName || "");
    const [lastName, setLastName] = useState<string>(userInfo.profile.lastName || "");
    const [username, setUsername] = useState<string>(userInfo.username || "");
    const [email, setEmail] = useState<string>(userInfo.email || "");
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();
    const dispatch = useDispatch();
    // const [updateProfile,{isLoading}] = useUpdateUserMutation();
    // const form = useForm<AccountFormValues>({
    //     resolver: zodResolver(accountFormSchema),
    //     defaultValues,
    // })
    useEffect(() =>{
        setFirstName(userInfo.profile.firstName);
        setLastName(userInfo.profile.lastName);
        setEmail(userInfo.email);
        setUsername(userInfo.username);
    },[userInfo.profile.setFirstName,userInfo.profile.setLastName,userInfo.setUsername,userInfo.setEmail]);
    const handleUpdate = async(e: SyntheticEvent) => {
        e.preventDefault();
        // if(userInfo.password !== currentPassword){
        //     toast.error("Passwords do not match");
        // }else{
        //     try {
        //         console.log(username, password);
        //         const res = await updateProfile({
        //             _id: userInfo._id,
        //             email,firstName,lastName, username }).unwrap();
        //         dispatch(setCredentials({ ...res.student }));
        //         console.log("Profile updated successfully");
        //     } catch (error:any) {
        //         toast.error(error?.data?.message || error.error);
        //     }
        // }
    };
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Update Info</Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Edit Name</SheetTitle>
                    <SheetDescription>
                        Make changes to your Profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            First Name
                        </Label>
                        <Input type="text" id="firstName"  defaultValue={firstName} className="col-span-3" onChange={(e: any) => {
                        setFirstName(e.target.value);
                    }} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Last Name
                        </Label>
                        <Input  type="text" id="lastName" defaultValue={lastName} className="col-span-3" onChange={(e: any) => {
                        setLastName(e.target.value);
                    }} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input type="text" id="username" defaultValue={username} className="col-span-3"onChange={(e: any) => {
                        setUsername(e.target.value);
                    }} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input id="email" defaultValue={email} className="col-span-3" onChange={(e: any) => {
                        setEmail(e.target.value);
                    }}/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Current Password
                        </Label>
                        <Input id="currentPassword" placeholder="••••••••" type="password" defaultValue={currentPassword} className="col-span-3" onChange={(e: any) => {
                        setCurrentPassword(e.target.value);
                    }}/>
                    </div>
                    {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            New Password
                        </Label>
                        <Input id="newpassword" placeholder="••••••••" type="password" defaultValue={password} className="col-span-3" onChange={(e: any) => {
                        setPassword(e.target.value);
                    }}/>
                    </div> */}
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" onChange={handleUpdate}>Save changes</Button>
                    </SheetClose>
                </SheetFooter>
            
            </SheetContent>
        </Sheet>
    )
}
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
// // import { toast } from "@/components/ui/use-toast"
// import { useDispatch, useSelector } from "react-redux"
// import { useState } from "react"
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation"

// // import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
// const accountFormSchema = z.object({
//     firstName: z
//         .string()
//         .min(2, {
//             message: "Name must be at least 2 characters.",
//         })
//         .max(30, {
//             message: "Name must not be longer than 30 characters.",
//         }),
//     lastName: z
//         .string()
//         .min(2, {
//             message: "Name must be at least 2 characters.",
//         })
//         .max(30, {
//             message: "Name must not be longer than 30 characters.",
//         }),
//     username: z.string().min(2, {
//             message: "Name must be at least 2 characters.",
//         }),
//     email: z
//         .string({
//             required_error: "Please select an email to display.",
//         })
//         .email(),
// })

// type AccountFormValues = z.infer<typeof accountFormSchema>

// // This can come from your database or API.
// const defaultValues: Partial<AccountFormValues> = {
//     // name: "Your name",
//     // date: new Date("2023-01-23"),
// }

// export function SheetDemo() {
//     const form = useForm<AccountFormValues>({
//         resolver: zodResolver(accountFormSchema),
//         defaultValues,
//     })
//     const { userInfo } = useSelector((state: any) => state.auth);
//     const [firstName, setFirstName] = useState<string>(userInfo.profile.firstName || "");
//     const [lastName, setLastName] = useState<string>(userInfo.profile.lastName || "");
//     const [username, setUsername] = useState<string>(userInfo.username || "");
//     const [email, setEmail] = useState<string>(userInfo.email || "");
//     const [currentPassword, setCurrentPassword] = useState<string>("");
//     const [password, setPassword] = useState<string>("");
//         const router = useRouter();
//         const dispatch = useDispatch();
//     // const form = useForm<AccountFormValues>({
//     //     resolver: zodResolver(accountFormSchema),
//     //     defaultValues,
//     // })

//     // const handleUpdate = async(e: SyntheticEvent) => {
        
//     // };
    
//     function onSubmit(data: AccountFormValues) {
//         // toast({
//         //     title: "You submitted the following values:",
//         //     description: (
//         //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
//         //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
//         //         </pre>
//         //     ),
//         // })
//         // data- data.preventDefault();
//         // data.preventDefault();
      
//         console.log(data);
//     }
//     return (
//         <Sheet>
//             <SheetTrigger asChild>
//                 <Button variant="outline">Update Info</Button>
//             </SheetTrigger>
//             <SheetContent>
//                 <SheetHeader>
//                     <SheetTitle>Edit Profile</SheetTitle>
//                     <SheetDescription>
//                         Make changes to your Profile here. Click save when you're done.
//                     </SheetDescription>
//                 </SheetHeader>
//                 <div className="grid gap-4 py-4">
//                 <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                 <FormField
//                     control={form.control}
//                     name="firstName"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>First Name</FormLabel>
//                             <FormControl>
//                                 <Input defaultValue={firstName} {...field} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="lastName"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Last Name</FormLabel>
//                             <FormControl>
//                                 <Input defaultValue={lastName} {...field} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                     control={form.control}
//                     name="username"
//                     render={({ field }) => (
//                         <FormItem>
//                             <FormLabel>Username</FormLabel>
//                             <FormControl>
//                                 <Input defaultValue={username} {...field} />
//                             </FormControl>
//                             <FormMessage />
//                         </FormItem>
//                     )}
//                 />
//                 <FormField
//                             control={form.control}
//                             name="email"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel className="">Email Address</FormLabel>
//                                     <FormControl>
//                                         <Input defaultValue={email} {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                         <SheetFooter>
//                     <SheetClose asChild>
//                         <Button type="submit">Save changes</Button>
//                     </SheetClose>
//                 </SheetFooter> 
//                 {/* <Button type="submit">Update account</Button> */}
//             </form>
//         </Form>
//                 </div>
//                 {/* <SheetFooter>
//                     <SheetClose asChild>
//                         <Button type="submit">Save changes</Button>
//                     </SheetClose>
//                 </SheetFooter> */}
            
//             </SheetContent>
//         </Sheet>
//     )
// }
