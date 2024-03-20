"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import Link from "next/link"
import MultipleSelectorDemo from "./tech-dropdown"
const formSchema = z.object({
    projectName: z.string().min(2, {
        message: "Project name must be at least 2 characters.",
    }),
    description: z.string().refine(value => {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= 20;
    }, {
        message: "Description must be at least 20 words."
    }),
    github: z.string().url(),
    technologies: z.string().min(2, {
        message: "Technologies must be at least 2 characters",
    }),
    problemStatement: z.string().refine(value => {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= 15;
    }, {
        message: "Problem statement must be at least 15 words."
    }),
    typeOfProject: z.any(),
})

export default function ProfileForm() {
    //new testing
    //new testing ends here
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
            description: "",
            github: "",
            technologies: "",
            problemStatement: "",
            typeOfProject: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <div className="px-64 py-16 ">
            <Card className="px-16 py-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="projectName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">Project Name</FormLabel>
                                    <FormDescription>
                                        WHAT ARE YOU CALLING IT?
                                    </FormDescription>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">Description</FormLabel>
                                    <FormDescription>
                                        WRITE A SHORT, SHARP AND ON POINT DESCRIPTION OF YOUR PROJECT
                                    </FormDescription>
                                    <FormControl>
                                        <Textarea placeholder="" className="resize-none text-wrap h-24" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="problemStatement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">The Problem It Solves</FormLabel>
                                    <FormDescription>
                                        DESCRIBE WHAT CAN PEOPLE USE IT FOR, OR HOW IT MAKES EXISTING TASKS EASIER/SAFER
                                    </FormDescription>
                                    <FormControl>
                                    <Textarea placeholder="" className="resize-none text-wrap h-24" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="technologies"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">Technologies Used</FormLabel>
                                    <FormDescription>
                                        TECHNOLOGIES THAT WILL BE USED IN BUILDING THE PROJECT.
                                    </FormDescription>
                                    <FormControl>
                                        {/* <Input placeholder="" {...field} /> */}
                                        <MultipleSelectorDemo/>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="github"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">Github Link</FormLabel>
                                    <FormDescription>
                                        ADD GITHUB REPOSITORY LINK
                                    </FormDescription>
                                    <FormControl>
                                        <Input placeholder="Paste or type a link" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="typeOfProject"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-xl">Type Of Project</FormLabel>
                                    <FormDescription>
                                        WHAT YOUR PROJECT WILL LOOK LIKE
                                    </FormDescription>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl className="w-56">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select type of your project" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="software">Software</SelectItem>
                                            <SelectItem value="hardware">Hardware</SelectItem>
                                            <SelectItem value="softwareHardware">Software + Hardware</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
