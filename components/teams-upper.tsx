"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chat } from "@/components/ui/chat/chat";
import React, { useEffect, useState } from "react";
import { UserCard } from "@/components/member-teacher";
import { userData } from "@/components/data";
import { CardsMetric } from "@/components/git-line";
import { GithubCard } from "@/components/github-card";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { TooltipImage } from "./tooltipimg";
import { AnimatedTooltip } from "./ui/animated-tooltip";
export default function TeamTop() {
    const [selectedUser, setSelectedUser] = React.useState(userData[0]);
    const [isMobile, setIsMobile] = useState(false);
    return (
        <div className="h-auto py-8">
            <div className="grid grid-cols-6 grid-rows-2 gap-4">
                <div className="flex flex-col col-span-2 row-span-2 gap-2 ml-8">
                    <Card className=" p-2"><CardHeader><CardTitle>Project Title!</CardTitle>
                        <CardDescription>Project Description</CardDescription>
                    </CardHeader></Card>
                    <Card className="p-2 ">
                        <CardHeader>
                            <CardTitle>Members</CardTitle>
                            <CardDescription>Team working on the project</CardDescription>
                        </CardHeader>
                        {/* {userData.map((member, index) => (
                            // <UserCard
                            //     key={index}
                            //     name={member.name}
                            //     imageUrl={member.image}
                            //     altText=""
                            // />
                            <AnimatedTooltip items={userdata}/>
                            // <Members key={index} member={member} />
                        ))} */}
                        <CardContent className="flex flex-row gap-6"><AnimatedTooltip items={userData}/></CardContent>
                        </Card>
                    <Card className="p-2 "><CardHeader>
                        <CardTitle>Teachers/Mentors</CardTitle>
                        <CardDescription>Instructors guiding the project</CardDescription>
                    </CardHeader>
                        {/* {userData.map((member, index) => (
                            <UserCard
                                key={index}
                                name={member.name}
                                imageUrl={member.image}
                                altText=""
                            />
                        ))} */}
                        <CardContent className="flex flex-row gap-6 "><AnimatedTooltip items={userData}/></CardContent>
                        </Card>
                </div>
                {/* <Card className="col-span-3 row-span-5 col-start-3 h-[40rem] row-start-1 border-2 rounded-lg max-w-5xl">
                    <Chat
                        selectedUser={selectedUser}
                        isMobile={isMobile}
                    />
                </Card> */}
                <div className="flex flex-row col-span-4  gap-6 ">
                    {/* <div className="w-[30rem]"><GithubCard/></div> */}
                    <GithubCard/>
                    <Card className="w-[30rem]">
                        <CardHeader>
                            <CardTitle>Tech Stack</CardTitle>
                            <CardDescription>Technologies used in this project</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-4">
                                <li>React</li>
                                <li>Tailwind CSS</li>
                                <li>Node.js</li>
                                <li>PostgreSQL</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                {/* <div className="col-span-2">
                <GithubCard/>
                </div> */}
                <div className="col-span-4"><CardsMetric/></div>
            </div>
            
        </div>
    )
}
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Chat } from "@/components/ui/chat/chat";
// import React, { useEffect, useState } from "react";
// import { UserCard } from "@/components/member-teacher";
// import { userData } from "@/components/data";
// import { CardsMetric } from "@/components/git-line";
// import { GithubCard } from "@/components/github-card";
// import { DotsVerticalIcon } from "@radix-ui/react-icons";
// export default function TeamTop() {
//     const [selectedUser, setSelectedUser] = React.useState(userData[0]);
//     const [isMobile, setIsMobile] = useState(false);

//     return (
//         <div className="h-auto p-8 grid grid-cols-6 grid-rows-5 gap-4">
//             <div className="col-span-2">
//                 <Card className="p-2">
//                     <CardHeader>
//                         <CardTitle>Project Title!</CardTitle>
//                         <CardDescription>Project Description</CardDescription>
//                     </CardHeader>
//                 </Card>
//             </div>
//             <div className="col-span-2 row-span-2 col-start-1 row-start-2">
//                 <Card className="p-2 flex flex-col">
//                     <CardHeader>
//                         <CardTitle>Members</CardTitle>
//                         <CardDescription>Team working on the project</CardDescription>
//                     </CardHeader>
//                     {userData.map((member, index) => (
//                         <UserCard
//                             key={index}
//                             name={member.name}
//                             imageUrl={member.image}
//                             altText=""
//                         />
//                     ))}
//                 </Card>
//             </div>
//             <div className="col-span-2 row-span-2 col-start-1 row-start-4">
//                 <Card className="p-2 flex flex-col">
//                     <CardHeader>
//                         <CardTitle>Teachers/Mentors</CardTitle>
//                         <CardDescription>Instructors guiding the project</CardDescription>
//                     </CardHeader>
//                     {userData.map((member, index) => (
//                         <UserCard
//                             key={index}
//                             name={member.name}
//                             imageUrl={member.image}
//                             altText=""
//                         />
//                     ))}
//                 </Card>
//             </div>
//             <div className="col-span-2  col-start-3 row-start-1">
//                 <GithubCard />
//             </div>
//             <div className="col-span-4 row-span-1 col-start-3 row-start-2">
//                 <CardsMetric />
//             </div>
//             <div className="col-span-2 row-span-1 col-start-5 row-start-1">
//                 <Card className="flex flex-col">
//                     <CardHeader>
//                         <CardTitle>Tech Stack</CardTitle>
//                         <CardDescription>Technologies used in this project</CardDescription>
//                     </CardHeader>
//                     <CardContent>
//                         <ul className="list-disc pl-4">
//                             <li>React</li>
//                             <li>Tailwind CSS</li>
//                             <li>Node.js</li>
//                             <li>PostgreSQL</li>
//                         </ul>
//                     </CardContent>
//                 </Card>
//             </div>
//         </div>
//     );
// }