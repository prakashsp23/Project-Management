"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Chat } from "@/components/ui/chat/chat";
import React, { useEffect, useState } from "react";
import { userData } from "@/components/data";
import TeamTop from "@/components/teams-upper";
import TeamTab from "@/components/ui/team-tab";
import { Tabs2 } from "@/components/ui/team-tab-2";
export default function Team() {
    const [selectedUser, setSelectedUser] = React.useState(userData[0]);
    const [isMobile, setIsMobile] = useState(false);
    return (
        <div className="px-8">
            {/* <TeamTop />
            <div className="flex justify-center pb-10">
                <Card className="h-[40rem] w-[45rem] border-2 rounded-lg max-w-5xl">
                    <Chat
                        selectedUser={selectedUser}
                        isMobile={isMobile}
                    />
                </Card>
            </div> */}
            <TeamTab/>
            {/* <Tabs2/> */}
        </div>

    )
}