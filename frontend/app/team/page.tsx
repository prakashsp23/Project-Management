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

            <TeamTab/>
        </div>

    )
}