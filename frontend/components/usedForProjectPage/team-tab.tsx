import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { userData } from "../morecomponents/data";
import { Card } from "../ui/card";
import { Chat } from "../ui/chat/chat";
import TeamTop from "./teams-upper";

export default function TeamTab({ projectParams }: any) {
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
          <TeamTop projectParams={projectParams} />
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
