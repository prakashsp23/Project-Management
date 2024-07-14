import { ChatLayout } from "@/components/ui/chat/chat-layout";
import { cookies } from "next/headers";
import { Card } from "../ui/card";

export default function Chatbox() {
    const layout = cookies().get("react-resizable-panels:layout");
    const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

    return (
        <main className="flex h-[calc(85dvh)] flex-col items-center justify-center p-4 md:px-24 py-4 gap-4">
            <Card className="z-10 border rounded-lg max-w-5xl w-full h-full text-sm lg:flex">
                <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />
            </Card>
            {/* <BackgroundBeams/> */}
        </main>
    );
}
