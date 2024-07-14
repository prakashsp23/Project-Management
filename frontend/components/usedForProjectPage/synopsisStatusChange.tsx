"use client";
import React, { SyntheticEvent, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
// import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useUpdateStatusMutation } from "@/redux/slices/projectsApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "@/redux/slices/authSlice";
const FormSchema = z.object({
    // email: z
    //   .string({
    //     required_error: "Please select an email to display.",
    //   })
    //   .email(),
    status: z
        .string({
            required_error: "Choose appropriate status.",
        })
})

export default function SynopsisStatusChange({ projectId }: any) {
    const { userInfo, projects } = useSelector((state: any) => state.auth);
    const dispatch = useDispatch();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })
    const [updateStatus, isLoading] = useUpdateStatusMutation();
    async function onSubmit(values: z.infer<typeof FormSchema>) {
        try {
            toast.success("Updating status...");
            const res = await updateStatus({ id: projectId, status: values.status }).unwrap();
            console.log("API response:", res);
            toast('Changed Status to', {
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                        <code className="text-white">{JSON.stringify(values.status, null, 2)}</code>
                    </pre>
                ),
            });
        } catch (error: any) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status. Please try again.");
        }
    }

    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant="default" className="w-full" >Change status</Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>Update Synopsis Status</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Current Status</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="change status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="COMPLETED">Approve</SelectItem>
                                            <SelectItem value="REJECTED">Reject</SelectItem>
                                            <SelectItem value="PENDING_APPROVAL">Pending Approval</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogClose>
                            <Button type="submit" >Save changes</Button>
                        </DialogClose>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
