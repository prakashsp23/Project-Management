"use client";

import Image from "next/image";
import { Tabs } from "../ui/animatedTabs";
import TeamTop from "../teams-upper";
import { Chat } from "./chat/chat";
import { Card } from "./card";
import React, { useState } from "react";
import { userData } from "../data";

export function Tabs2() {
    const [selectedUser, setSelectedUser] = React.useState(userData[0]);
    const [isMobile, setIsMobile] = useState(false);
    const tabs = [
        {
            title: "Product",
            value: "product",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-accent ">
                    <p>Product Tab</p>
                    <TeamTop />
                </div>
            ),
        },
        {
            title: "Services",
            value: "services",
            content: (
                <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-accent">
                    <p>Services tab</p>
                    <div className="flex justify-center pb-10">
                <Card className="h-[40rem] w-[45rem] border-2 rounded-lg max-w-5xl">
                    <Chat
                        selectedUser={selectedUser}
                        isMobile={isMobile}
                    />
                </Card>
            </div>
                </div>
            ),
        },
    ];

    return (
        <div className="h-auto  [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  ">
            <Tabs tabs={tabs} />
        </div>
    );
}


