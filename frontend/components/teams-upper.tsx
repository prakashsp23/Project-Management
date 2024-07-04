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
import { useSelector } from "react-redux";
import Link from "next/link";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export default function TeamTop({ projectDetails }: any) {
  const { userInfo, projects } = useSelector((state: any) => state.auth);
  const router=useRouter();
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
      <div className="grid grid-cols-6 grid-rows-2 gap-4">
        <div className="flex flex-col col-span-2 row-span-2 gap-2 ml-8">
          <Card className=" p-2">
            <CardHeader>
              <CardTitle>{projectDetails.title}</CardTitle>
              <CardDescription>{projectDetails.description}</CardDescription>
            </CardHeader>
          </Card>
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
          <Card className="p-2 ">
            <CardHeader>
              <CardTitle>Teachers/Mentors</CardTitle>
              <CardDescription>Instructors guiding the project</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row gap-6 ">
              <AnimatedTooltip items={userData} />
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-row col-span-4  gap-6 ">
          <Card className="w-full max-w-md bg-card text-card-foreground p-6 rounded-lg shadow-lg">
            <div className="space-y-4">
              <div>
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
          <Card className="w-[30rem]">
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
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
