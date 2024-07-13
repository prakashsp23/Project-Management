// "use client";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import React, { useEffect, useState } from "react";
// import { userData } from "@/components/data";
// import { CardsMetric } from "@/components/git-line";
// import { GithubCard } from "@/components/github-card";
// import { AnimatedTooltip } from "./ui/animated-tooltip";
// import { useSelector } from "react-redux";

// export default function TeamTop({projectDetails}) {
//   const { userInfo, projects } = useSelector((state: any) => state.auth);
//   const filteredProjects: any = projects?.filter(
//     (project: any) => project.teamLeaderId === userInfo.userId
//   );

//   // Find the project with the latest dateCreated
//   const latestProject: any | undefined = filteredProjects?.reduce(
//     (prev: any | undefined, current: any) => {
//       if (!prev) return current;
//       const prevDate: Date = new Date(prev.dateCreated);
//       const currentDate: Date = new Date(current.dateCreated);
//       // Return the project with the later dateCreated
//       return prevDate > currentDate ? prev : current;
//     },
//     undefined // Start with undefined as initial value
//   );

//   console.log(latestProject);

//   return latestProject ? (
//     <div className="h-auto py-8">
//       <div className="grid grid-cols-6 grid-rows-2 gap-4">
//         <div className="flex flex-col col-span-2 row-span-2 gap-2 ml-8">
//           <Card className=" p-2">
//             <CardHeader>
//               <CardTitle>{latestProject.title}</CardTitle>
//               <CardDescription>{latestProject.description}</CardDescription>
//             </CardHeader>
//           </Card>
//           <Card className="p-2 ">
//             <CardHeader>
//               <CardTitle>Members</CardTitle>
//               <CardDescription>Team working on the project</CardDescription>
//             </CardHeader>
//             <CardContent className="flex flex-row gap-6">
//               <AnimatedTooltip items={userData} />
//             </CardContent>
//           </Card>
//           <Card className="p-2 ">
//             <CardHeader>
//               <CardTitle>Teachers/Mentors</CardTitle>
//               <CardDescription>Instructors guiding the project</CardDescription>
//             </CardHeader>
//             {/* {userData.map((member, index) => (
//                             <UserCard
//                                 key={index}
//                                 name={member.name}
//                                 imageUrl={member.image}
//                                 altText=""
//                             />
//                         ))} */}
//             <CardContent className="flex flex-row gap-6 ">
//               <AnimatedTooltip items={userData} />
//             </CardContent>
//           </Card>
//         </div>
//         {/* <Card className="col-span-3 row-span-5 col-start-3 h-[40rem] row-start-1 border-2 rounded-lg max-w-5xl">
//                     <Chat
//                         selectedUser={selectedUser}
//                         isMobile={isMobile}
//                     />
//                 </Card> */}
//         <div className="flex flex-row col-span-4  gap-6 ">
//           {/* <div className="w-[30rem]"><GithubCard/></div> */}
//           <GithubCard />
//           <Card className="w-[30rem]">
//             <CardHeader>
//               <CardTitle>Tech Stack</CardTitle>
//               <CardDescription>
//                 Technologies used in this project
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ul className="list-disc pl-4">
//                 {latestProject.technologiesUsed.map(
//                   (item: any, index: number) => (
//                     <li key={index}>{item}</li>
//                   )
//                 )}
//               </ul>
//             </CardContent>
//           </Card>
//         </div>
//         {/* <div className="col-span-2">
//                 <GithubCard/>
//                 </div> */}
//         <div className="col-span-4">
//           <CardsMetric />
//         </div>
//       </div>
//     </div>
//   ) : (
//     <></>
//   );
// }
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { userData } from "@/components/data";
import { GithubCard } from "@/components/github-card";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { BentoGrid } from "./bento-grid";
import { useGetProjectByIdMutation } from "@/redux/slices/projectsApiSlice";
import { toast } from "sonner";
import { setCurrentProject } from "@/redux/slices/authSlice";

export default function TeamTop({ projectParams }: any) {
  const { userInfo, projects } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const projectDetails = projects.find((p: any) => p.id === projectParams.projectId);
  // const [currentProject, { isLoading: isCurrentProject }] =useGetProjectByIdMutation();
  // useEffect(()=>{
    
  // },[])
  // const [currentProject, { isLoading: isCurrentProject }] = useGetProjectByIdMutation();

  // // useEffect hook to call the API when the component mounts
  // useEffect(() => {
  //   // Call the API to fetch project details when the component mounts
  //   // currentProject({ id: projectParams.projectId });
  //   const fetchData = async () => {
  //     try {
  //       const currentProjectsRes: any = await currentProject().unwrap();
  //       dispatch(setCurrentProject(projectsRes.projects));
  //     } catch (error: any) {
  //       toast.error(error?.data?.message || error.error);
  //     }
  //   };
  // }, []); 
  const [getProjectById, { isLoading: isGettingProject }] = useGetProjectByIdMutation();

  // useEffect(() => {
  //   const fetchProjectById = async () => {
  //     try {
  //       const currProjectRes: any = await getProjectById({ id: projectParams.projectId }).unwrap();
  //       // Handle the project response as needed
  //       console.log("Project details:", currProjectRes);
  //       dispatch(setCurrentProject(currProjectRes.currentProject));
  //     } catch (error: any) {
  //       // Handle any errors
  //       console.error("Error fetching project by ID:", error?.data?.message || error.error);
  //     }
  //   };

  //   fetchProjectById();
  // }, [projectParams.projectId]);
  useEffect(() => {
    const fetchProjectById = async () => {
      try {
        const currProjectRes: any = await getProjectById({ id: projectParams.projectId }).unwrap();
        // Handle the project response as needed
        console.log("Project details:", currProjectRes);
        dispatch(setCurrentProject(currProjectRes.projects));
      } catch (error: any) {
        // Handle any errors
        console.error("Error fetching project by ID:", error?.data?.message || error.error);
      }
    };

    fetchProjectById();
    // console.log(fetchProjectById);
  }, []); 
  // console.log(fetchProjectById);
  // console.log(currentProject);
  // const filteredProjects: any = projects?.filter(
  //   (project: any) => project.teamLeaderId === userInfo.userId
  // );

  // // Find the project with the latest dateCreated
  // const latestProject: any | undefined = filteredProjects?.reduce(
  //   (prev: any | undefined, current: any) => {
  //     if (!prev) return current;
  //     const prevDate: Date = new Date(prev.dateCreated);
  //     const currentDate: Date = new Date(current.dateCreated);
  //     // Return the project with the later dateCreated
  //     return prevDate > currentDate ? prev : current;
  //   },
  //   undefined // Start with undefined as initial value
  // );

  // console.log(latestProject);
  // console.log(projectDetails.projectId);
  return projectDetails ? (
    <div className="h-auto py-8">
      {/* <div className="grid grid-cols-6 grid-rows-2 gap-4">
        <div className="flex flex-col col-span-2 row-span-2 gap-2 ml-8">
          <ProjectDetailCard projectDetails={projectDetails} />
          <MemberDetailCard />
          <TeacherDetailCard />
        </div>
        <div className="flex flex-row col-span-4  gap-6 ">
        <BentoCardExperiment>
          <GithubCommitCard projectDetails={projectDetails} />
        </BentoCardExperiment>
          <GithubCommitCard projectDetails={projectDetails} />
          <TechnologiesUsedCard projectDetails={projectDetails} />
        </div>
        <div className="flex flex-row col-span-4  gap-6">
          <SynopsisDetailCard projectDetails={projectDetails} />
        </div>
        <BentoCardExperiment  projectDetails={projectDetails}/>
        <BentoCardExperiment>
          <GithubCommitCard projectDetails={projectDetails} />
        </BentoCardExperiment>
      </div> */}
      <BentoGrid>
      {/* {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))} */}
          <ProjectDetailCard projectDetails={projectDetails} />
          <MemberDetailCard />
          <TeacherDetailCard />
          <BentoCardExperiment>
          <GithubCommitCard projectDetails={projectDetails} />
        </BentoCardExperiment>
          {/* <GithubCommitCard projectDetails={projectDetails} /> */}
          <TechnologiesUsedCard projectDetails={projectDetails} />
          <SynopsisDetailCard projectDetails={projectDetails} />
    </BentoGrid>
    {/* <BentoCardExperiment>
          <GithubCommitCard projectDetails={projectDetails} />
        </BentoCardExperiment> */}
    </div>
  ) : (
    <></>
  );
}
function ProjectDetailCard({ projectDetails }: any) {
  return (
    <Card className=" p-2">
      <CardHeader>
        <CardTitle>{projectDetails.title}</CardTitle>
        <CardDescription>{projectDetails.description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
function MemberDetailCard() {
  return (
    <Card className="p-2 ">
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>Team working on the project</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-6">
        <AnimatedTooltip items={userData} />
        {/* {projectDetails.teamMembers}
              {projectDetails.teamLeaderId} */}
      </CardContent>
    </Card>
  )
}
function TeacherDetailCard() {
  return (
    <Card className="p-2 ">
      <CardHeader>
        <CardTitle>Teachers/Mentors</CardTitle>
        <CardDescription>Instructors guiding the project</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-6 ">
        <AnimatedTooltip items={userData} />
      </CardContent>
    </Card>
  )
}
function GithubCommitCard({ projectDetails }: any) {
  return (
    <Card className="w-full grid items-center bg-transparent p-6 ">
      <div className="space-y-4">
        <div className="">
          <h2 className="font-semibold leading-none tracking-tight">GitHub Repository</h2>
          <p className="text-sm text-muted-foreground">View the project's code on GitHub</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold leading-none tracking-tight">Commits</h3>
            <p className="text-sm text-muted-foreground">Last updated 3 minutes ago</p>
          </div>
          <div className="flex items-center">
            {/* <span className="text-2xl font-bold">423</span> */}
            <Link href={`/projects/${projectDetails.id}/timeline`}>
              <Button variant="default" className="ml-4">
                View Timeline
              </Button>
            </Link>
          </div>
        </div>
        <Link href={projectDetails.githubLink}>
          <Button variant="outline" className="w-full mt-6">
            View Repository
          </Button>
        </Link>
      </div>
    </Card>
    // <div className="w-full grid items-center max-w-md bg-transparent p-6 ">
    // <div className="space-y-4">
    //     <div className="">
    //       <h2 className="font-semibold leading-none tracking-tight">GitHub Repository</h2>
    //       <p className="text-sm text-muted-foreground">View the project's code on GitHub</p>
    //     </div>
    //     <div className="flex items-center justify-between">
    //       <div>
    //         <h3 className="font-semibold leading-none tracking-tight">Commits</h3>
    //         <p className="text-sm text-muted-foreground">Last updated 3 minutes ago</p>
    //       </div>
    //       <div className="flex items-center">
    //         {/* <span className="text-2xl font-bold">423</span> */}
    //         <Link href={`/projects/${projectDetails.id}/timeline`}>
    //           <Button variant="default" className="ml-4">
    //             View Timeline
    //           </Button>
    //         </Link>
    //       </div>
    //     </div>
    //     <Link href={projectDetails.githubLink}>
    //       <Button variant="outline" className="w-full mt-6">
    //         View Repository
    //       </Button>
    //     </Link>
    //   </div>
    // </div>
    
  )
}

function TechnologiesUsedCard({ projectDetails }: any) {
  return (
    <Card className="w-[30rem] ">
      <CardHeader>
        <CardTitle>Tech Stack</CardTitle>
        <CardDescription>
          Technologies used in this project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-4">
          {projectDetails.technologiesUsed.map(
            (item: any, index: number) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
function SynopsisDetailCard({ projectDetails }: any) {
  return (
    <Card className="w-full grid items-center max-w-md bg-card text-card-foreground p-6 rounded-lg shadow-lg">
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold leading-none tracking-tight">Synopsis</h2>
          {/* <p className="text-sm text-muted-foreground">Status</p> */}
        </div>
        <div className="flex items-center justify-between">
          <div>
            {/* <h3 className="font-semibold leading-none tracking-tight">Commits</h3> */}
            <p className="text-sm text-muted-foreground">Status:</p>
          </div>
          <div className="flex items-center">
            <span className="text-sm">{projectDetails.status}</span>
          </div>
        </div>
        <Link href={`/projects/${projectDetails.id}/synopsis`}>
          <Button variant="outline" className="w-full mt-6">
            View Synopsis
          </Button>
        </Link>
      </div>
    </Card>
  )
}
export function BentoCardExperiment({children}){
  return(
    <div
        className={cn(
            "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
            // light styles
            "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
            // dark styles
            "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        )}
    >
        {/* <div>background</div> */}
        {/* <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
            <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
            <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
                name
            </h3>
            <p className="max-w-lg text-neutral-400">description</p>
        </div>
        
        <div
            className={cn(
                "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
            )}
        >
            <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
                <a href=''>
                    cta
                    <ArrowRightIcon className="ml-2 h-4 w-4" />
                </a>
            </Button>
        </div>
        <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" /> */}
         {/* <SynopsisDetailCard projectDetails={projectDetails} /> */}
         {/* <GithubCommitCard projectDetails={projectDetails} /> */}
         {children}
         {/* <div className="space-y-4 p-8">
        <div className="">
          <h2 className="font-semibold leading-none tracking-tight">GitHub Repository</h2>
          <p className="text-sm text-muted-foreground">View the project's code on GitHub</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold leading-none tracking-tight">Commits</h3>
            <p className="text-sm text-muted-foreground">Last updated 3 minutes ago</p>
          </div>
          <div className="flex items-center">
            <Link href={`/projects/${projectDetails.id}/timeline`}>
              <Button variant="default" className="ml-4">
                View Timeline
              </Button>
            </Link>
          </div>
        </div>
        <Link href={projectDetails.githubLink}>
          <Button variant="outline" className="w-full mt-6">
            View Repository
          </Button>
        </Link>
      </div> */}
      
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10 " />
    </div>
  )
}