import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TabsTrigger, TabsList, TabsContent, Tabs } from "@/components/ui/tabs";
import Link from "next/link";
import Image from "next/image";
import TeamTop from "../teams-upper";
import { Card } from "./card";
import { Chat } from "./chat/chat";
import React, { useState } from "react";
import { userData } from "../data";

export default function TeamTab({projectDetails}:any) {
  const [selectedUser, setSelectedUser] = React.useState(userData[0]);
  const [isMobile, setIsMobile] = useState(false);
  return (
    <div>
      <Tabs defaultValue="project">
        <div className="flex justify-center">
          <TabsList className="flex w-80 gap-4 overflow-auto">
            <TabsTrigger value="project">Project Details</TabsTrigger>
            <TabsTrigger value="chat">Chat</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="project">
          <TeamTop projectDetails={projectDetails}/>
        </TabsContent>
        <TabsContent value="chat">
          <div className="flex justify-center py-8 pb-10">
            <Card className="h-[35rem] w-[45rem] border-2 rounded-lg max-w-5xl">
              <Chat selectedUser={selectedUser} isMobile={isMobile} />
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
