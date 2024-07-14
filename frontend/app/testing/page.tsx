'use client'
import { promises as fs } from "fs"
import path from "path"
import { Metadata } from "next"
import Image from "next/image"
import { z } from "zod"
import { columns, columns1 } from "@/components/ui/progress table/component/columns"
import { DataTable } from "@/components/ui/progress table/component/data-table"
import { UserNav } from "@/components/ui/progress table/component/user-nav"
import { taskSchema } from "@/components/ui/progress table/data/schema"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { setProjects } from "@/redux/slices/authSlice"
import { useGetAllProjectMutation } from "@/redux/slices/projectsApiSlice"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function TaskPage() {
    //   const tasks = await getTasks()
    const dispatch = useDispatch();
    const { projects, userInfo, userType } = useSelector((state: any) => state.auth);
    console.log(projects);
    const [getAllProjects, { isLoading: isProjectsLoading }] = useGetAllProjectMutation();
    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                const ress: any = await getAllProjects({
                    //  ...userInfo?.userId,
                }).unwrap();
                dispatch(setProjects(ress.projects));
            } catch (error: any) {
                // Handle any errors
                console.error("Error fetching project by ID:", error?.data?.message || error.error);
            }
        };

        fetchAllProjects();
        // console.log(fetchProjectById);
    }, []);
    const projectsAsMentors = Array.isArray(projects)
        ? projects.filter((project: any) =>
            // project.teamLeaderId === userInfo.userId ||
            project.mentors.some((member: any) => member.userId === userInfo.userId)
        )
        : [];
    const projectsAsCC = Array.isArray(projects)
        ? projects.filter((project: any) =>
            // project.teamLeaderId === userInfo.userId ||
            project.classCoordinator.some((member: any) => member.userId === userInfo.userId)
        )
        : [];
    // console.log(projectsAsMentors);
    const tasks = Array.isArray(projectsAsCC) ? projectsAsCC.map((project, index) => ({
        id: index + 1,
        title: project.title,
        status: project.status,
        projectId: project.id,
        mentors: Array.isArray(project.mentors) ? project.mentors.map(member => member.username).join(", ") : "", // Assuming teamMembers is an array of objects with a 'username' field
        // label: "bug", // Adjust dynamically if needed
        // priority: "high", // Adjust dynamically if needed
        teamMembers: Array.isArray(project.teamMembers) ? project.teamMembers.map(member => member.username).join(", ") : "" // Check if teamMembers is an array// Assuming teamMembers is an array of objects with a 'username' field
    })) : [];
    const tasks2 = Array.isArray(projectsAsMentors) ? projectsAsMentors.map((project, index) => ({
        id: index + 1,
        title: project.title,
        status: project.status,
        projectId: project.id,
        // mentors: Array.isArray(project.mentors) ? project.mentors.map(member => member.username).join(", ") : "", // Assuming teamMembers is an array of objects with a 'username' field
        // label: "bug", // Adjust dynamically if needed
        // priority: "high", // Adjust dynamically if needed
        teamMembers: Array.isArray(project.teamMembers) ? project.teamMembers.map(member => member.username).join(", ") : "" // Check if teamMembers is an array// Assuming teamMembers is an array of objects with a 'username' field
    })) : [];
    return (
        <>
            {/* <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                <div className="flex items-center justify-between space-y-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of Projects!
                        </p>
                    </div>
                </div>
                <DataTable data={tasks} columns={columns} />
            </div> */}
            <div>
                <Tabs defaultValue="classCoordinator">
                    <div className="flex justify-center">
                        <TabsList className="flex w-80 gap-4 overflow-auto">
                            <TabsTrigger value="classCoordinator">Class Coordinator</TabsTrigger>
                            <TabsTrigger value="mentor">Mentor</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="classCoordinator">
                        {/* <TeamTop projectParams={projectParams}/> */}
                        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                            <div className="flex items-center justify-between space-y-2">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                                    <p className="text-muted-foreground">
                                        Here&apos;s a list of Projects! As Class Coordinator
                                    </p>
                                </div>
                            </div>
                            <DataTable data={tasks} columns={columns} />
                        </div>
                    </TabsContent>
                    <TabsContent value="mentor">
                        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                            <div className="flex items-center justify-between space-y-2">
                                <div>
                                    <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                                    <p className="text-muted-foreground">
                                        Here&apos;s a list of Projects! As Mentor
                                    </p>
                                </div>
                            </div>
                            <DataTable data={tasks2} columns={columns1} />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </>
    )
}
