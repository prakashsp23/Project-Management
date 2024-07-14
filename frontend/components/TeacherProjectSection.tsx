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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Card } from "./ui/card"
import { BentoCardExperiment } from "./teams-upper"

import { motion } from "framer-motion";
import { MultiStepLoader } from "./ui/multi-step-loader"
const loadingStates = [
    {
        text: "Fetching Project Details",
    },
    {
        text: "Getting things ready",
    },
    {
        text: "Loading Projects",
    }
];
export default function TaskPageForTeacher() {
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

    if (isProjectsLoading) {
        return (
            <div className="w-full h-[60vh] flex items-center justify-center">
                <MultiStepLoader loadingStates={loadingStates} loading={isProjectsLoading} duration={1000} />
            </div>
        )
    }
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
            <motion.div
                initial={{
                    opacity: 0,
                    y: 20,
                }}
                animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                }}
                transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                }}
            >
                {/* </HeroHighlight> */}
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
                            {tasks.length === 0 && <div className="flex items-center justify-center h-[30rem] w-full">
                                <BentoCardExperiment className="p-24">
                                    <h2 className="text-3xl font-semibold tracking-tight">Not assigned as Class Coordinator yet...</h2>
                                </BentoCardExperiment>
                            </div>}
                            {tasks.length > 0 && (
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
                                // <DataTable data={tasks} columns={columns} />
                            )}
                        </TabsContent>
                        <TabsContent value="mentor">
                            {/* <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
                        <div className="flex items-center justify-between space-y-2">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                                <p className="text-muted-foreground">
                                    Here&apos;s a list of Projects! As Mentor
                                </p>
                            </div>
                        </div>
                        <DataTable data={tasks2} columns={columns1} />
                    </div> */}
                            {tasks.length === 0 && <div className="flex items-center justify-center h-[30rem] w-full">
                                <BentoCardExperiment className="p-24">
                                    <h2 className="text-3xl font-semibold tracking-tight">Not assigned to any project as Mentor yet...</h2>
                                </BentoCardExperiment>
                            </div>}
                            {tasks.length > 0 && (
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
                            )}
                        </TabsContent>
                    </Tabs>
                </div >
            </motion.div>
        </>
    )
}
