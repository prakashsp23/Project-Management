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
import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { toast } from '@/components/ui/use-toast';
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import MultipleSelector, { Option } from "./ui/multiple-dropdown-selector"
import { LoadingButton } from "./ui/loading-button"
const OPTIONS: Option[] = [
    { label: 'nextjs', value: 'Nextjs' },
    { label: 'React', value: 'react' },
    { label: 'Remix', value: 'remix' },
    { label: 'Vite', value: 'vite' },
    { label: 'Nuxt', value: 'nuxt' },
    { label: 'Vue', value: 'vue' },
    { label: 'Svelte', value: 'svelte' },
    { label: 'Angular', value: 'angular' },
    { label: 'Ember', value: 'ember', },
    { label: 'Gatsby', value: 'gatsby', },
    { label: 'Astro', value: 'astro' },
];
const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
    // disable: z.boolean().optional(),
});
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
    problemStatement: z.string().refine(value => {
        const wordCount = value.trim().split(/\s+/).length;
        return wordCount >= 15;
    }, {
        message: "Problem statement must be at least 15 words."
    }),
    technologies: z.array(optionSchema).min(1),
    github: z.string().url(),
    
    typeOfProject: z.any(),
})

export default function ProfileForm() {
    const { toast } = useToast()
    //new testing
    //new testing ends here
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            projectName: "",
            description: "",
            github: "",
            technologies: [],
            problemStatement: "",
            typeOfProject: "",
        },
    })
    // const [loading, setLoading] = React.useState(false);
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // toast({
        //     title: 'Your submitted data',
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(values)}</code>
        //         </pre>
        //     ),
        // });     
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
                                    <FormLabel className="text-xl">Technologies</FormLabel>
                                    <FormControl>
                                        <MultipleSelector
                                            value={field.value}
                                            onChange={field.onChange}
                                            defaultOptions={OPTIONS}
                                            creatable
                                            placeholder="Select Frameworks you like or Type something that does not exist in dropdowns..."
                                            emptyIndicator={
                                                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                                    no results found.
                                                </p>
                                            }
                                        />
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
                        <Button type="submit">
                            Submit
                        </Button>
                    </form>
                </Form>
            </Card>
        </div>
    )
}
