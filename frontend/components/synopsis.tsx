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
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import * as React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import MultipleSelector, { Option } from "./ui/multiple-dropdown-selector"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { useCreateProjectMutation } from "@/redux/slices/projectsApiSlice"
import { toast } from "sonner"
import { setProjects } from "@/redux/slices/authSlice"
// import { toast } as toast1 from "react-toastify"  ;
import { toast as toast1 } from "react-toastify";
import withAuth from "@/lib/PrivateRoute"
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
    title: z.string().min(2, {
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
    technologiesUsed: z.array(optionSchema).min(1),
    githubLink: z.string().url(),

    projectType: z.any(),
})
function ProfileForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
            githubLink: "",
            technologiesUsed: [],
            problemStatement: "",
            projectType: "",
        },
    })
    const router = useRouter();
    const dispatch = useDispatch();
    const { userInfo,projects } = useSelector((state: any) => state.auth);
    const [createProject, { isLoading: isCreatingProject }] = useCreateProjectMutation();
    console.log(projects);
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log('Form values:', values);
            console.log(projects);
            toast.success('Creating project...');
            const res = await createProject({
                title: values.title,
                description: values.description,
                teamLeaderId: userInfo?.userId,
                problemStatement: values.problemStatement,
                technologiesUsed: values.technologiesUsed.map(tech => tech.value),
                githubLink: values.githubLink,
                projectType: values.projectType,
            }).unwrap();
            console.log(projects);
            console.log('API response:', res);
            dispatch(setProjects({ ...res.projects }));
            console.log(projects);
            toast.success('Project created successfully!');
            console.log(projects);
            // router.push("/projects");
        } catch (error: any) {
            console.error('Error creating project:', error);
            toast.error('Failed to create project. Please try again.');
            toast1.error(error?.data?.message || error.error);
            console.log(projects);
        }
    }
    console.log(projects);
    return (
        <div className="px-64 py-16 ">
            <h1>{userInfo?.userId}</h1>
            <Card className="px-16 py-8">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
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
                            name="technologiesUsed"
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
                            name="githubLink"
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
                            name="projectType"
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
                                            <SelectItem value="Software">Software</SelectItem>
                                            <SelectItem value="Hardware">Hardware</SelectItem>
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
export default withAuth(ProfileForm);