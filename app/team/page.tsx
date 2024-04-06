"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chat } from "@/components/ui/chat/chat";
import React, { useEffect, useState } from "react";
import { UserCard } from "@/components/member-teacher";
import { userData } from "@/components/data";
import { CardsMetric } from "@/components/git-line";
export default function Team() {
    const [selectedUser, setSelectedUser] = React.useState(userData[0]);
    const [isMobile, setIsMobile] = useState(false);
    return (
        <div className="h-auto">
            <div className="grid grid-cols-6 grid-rows-5 gap-4">
                <div className="flex flex-col col-span-2 row-span-5 gap-2 ml-8">
                    <Card className=" p-2"><CardHeader><CardTitle>Project Title!</CardTitle>
                        <CardDescription>Project Description</CardDescription>
                    </CardHeader></Card>
                    <Card className="p-2 ">
                        <CardHeader>
                            <CardTitle>Members:</CardTitle>
                        </CardHeader>
                        {userData.map((member, index) => (
                            <UserCard
                                key={index}
                                name={member.name}
                                imageUrl={member.image}
                                altText=""
                            // heading="Members:"
                            />
                            // <Members key={index} member={member} />
                        ))}</Card>
                    <Card className="p-2 "><CardHeader>
                        <CardTitle>Teachers:</CardTitle>
                    </CardHeader>
                        {userData.map((member, index) => (
                            <UserCard
                                key={index}
                                name={member.name}
                                imageUrl={member.image}
                                altText=""
                            />
                        ))}</Card>
                </div>
                <Card className="col-span-3 row-span-5 col-start-3 h-[40rem] row-start-1 border-2 rounded-lg max-w-5xl">
                    <Chat
                        selectedUser={selectedUser}
                        isMobile={isMobile}
                    />
                </Card>
                <div className="flex flex-col col-span-1 row-span-5 gap-2 mr-4">
                    <Card>
                        <CardHeader><CardTitle>Github link:</CardTitle>
                            <CardDescription><a href={"https://github.com/"} target="_blank" className="text-blue-400 hover:underline">
                                https://github.com/
                            </a></CardDescription>
                        </CardHeader>
                    </Card>
                    <Card>hii1</Card>
                </div>
            </div>
            <div className="m-16"><CardsMetric/></div>
        </div>
    )
}