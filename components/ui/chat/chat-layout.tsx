
"use client";

import { userData } from "@/components/data";
import React, { useEffect, useState } from "react";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";
import { Sidebar } from "../sidebar";
import { Chat } from "./chat";
interface ChatLayoutProps {
    defaultLayout: number[] | undefined;
    defaultCollapsed?: boolean;
    navCollapsedSize: number;
}

export function ChatLayout({
    defaultLayout = [240, 560],
    defaultCollapsed = false,
    navCollapsedSize,
}: ChatLayoutProps) {
    const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
    const [selectedUser, setSelectedUser] = React.useState(userData[0]);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreenWidth = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        checkScreenWidth();

        // Event listener for screen width changes
        window.addEventListener("resize", checkScreenWidth);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener("resize", checkScreenWidth);
        };
    }, []);

    return (
        <ResizablePanelGroup
            direction="horizontal"
            onLayout={(sizes: number[]) => {
                document.cookie = `react-resizable-panels:layout=${JSON.stringify(
                    sizes
                )}`;
            }}
            className="h-full items-stretch"
        >
            <ResizablePanel
                defaultSize={defaultLayout[0]}
                collapsedSize={navCollapsedSize}
                collapsible={true}
                minSize={isMobile ? 0 : 20}
                maxSize={isMobile ? 8 : 25} // Adjust the maxSize value for the sidebar
                onCollapse={() => {
                    setIsCollapsed(true);
                    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                        true
                    )}`;
                }}
                onExpand={() => {
                    setIsCollapsed(false);
                    document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
                        false
                    )}`;
                }}
                className={cn(
                    isCollapsed && "w-[50px] md:w-[70px] transition-all duration-300 ease-in-out"
                )}
            >
                <Sidebar
                    isCollapsed={isCollapsed || isMobile}
                    members={userData.map((user) => ({
                        name: user.name,
                        image: user.image,
                    }))}
                    // teachers={userData.map((user) => ({
                    //     name: user.name,
                    //     image: user.image,
                    // }))}
                    isMobile={isMobile}
                />
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
                <Chat
                    selectedUser={selectedUser}
                    isMobile={isMobile}
                />
            </ResizablePanel>
        </ResizablePanelGroup>
    );
}