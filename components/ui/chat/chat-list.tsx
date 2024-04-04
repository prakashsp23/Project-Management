import { Message, UserData } from "@/components/data";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { Avatar, AvatarImage } from "../avatar";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Card, CardFooter, CardHeader } from "../card";

interface ChatListProps {
    messages?: Message[];
    selectedUser: UserData;
    sendMessage: (newMessage: Message) => void;
    isMobile: boolean;
}

export function ChatList({
    messages,
    selectedUser,
    sendMessage,
    isMobile
}: ChatListProps) {
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    }, [messages]);

    // const isLink = (text: string) => {
    //     const urlRegex = /(https?:\/\/[^\s]+)/g;
    //     return text.match(urlRegex);
    // };
    const renderMessageContent = (message: Message) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = message.message.split(urlRegex);
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        // const nameColor = message.type === 'teacher' ? 'text-red-400' : 'text-purple-300'; // Set color based on message type
    
        return (
                <Card className="bg-accent rounded-md max-w-xs">
                    <CardHeader className={`text-[0.65rem] flex justify-center items-end py-1 px-3 text-purple-400 `}>{message.name}</CardHeader>
                    <div className="py-1 px-3 ">
                        {parts.map((part, index) => {
                            if (part.match(urlRegex)) {
                                return (
                                    <a key={index} href={part} target="_blank" className="text-blue-400 hover:underline">
                                        {part}
                                    </a>
                                );
                            } else {
                                const capitalizedPart = part.charAt(0).toUpperCase() + part.slice(1);
                                return capitalizedPart;
                            }
                        })}
                    </div>
                    <CardFooter className="text-[0.65rem] flex justify-end text-muted-foreground pb-1 px-3">
                        {currentTime}
                    </CardFooter>
                </Card>
        );
    };

    return (
        <div className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col">
            <div
                ref={messagesContainerRef}
                className="w-full overflow-y-auto overflow-x-hidden h-full flex flex-col"
            >
                <AnimatePresence>
                    {messages?.map((message, index) => (
                        <motion.div
                            key={index}
                            layout
                            initial={{ opacity: 0, scale: 1, y: 50, x: 0 }}
                            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                            exit={{ opacity: 0, scale: 1, y: 1, x: 0 }}
                            transition={{
                                opacity: { duration: 0.1 },
                                layout: {
                                    type: "spring",
                                    bounce: 0.3,
                                    duration: messages.indexOf(message) * 0.05 + 0.2,
                                },
                            }}
                            style={{
                                originX: 0.5,
                                originY: 0.5,
                            }}
                            className={cn(
                                "flex flex-col gap-2 p-4 whitespace-pre-wrap",
                                message.name !== selectedUser.name ? "items-end" : "items-start"
                            )}
                        >
                            <div className="flex gap-3 items-center">
                                {message.name === selectedUser.name && (
                                    <Image
                                        height={100}
                                        width={100}
                                        src={message.image}
                                        alt={message.name}
                                        className="object-cover !m-0 !p-0 object-top rounded-full h-9 w-9 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
                                    />
                                )}
                                {renderMessageContent(message)}
                                {message.name !== selectedUser.name && (
                                    <Image
                                        height={100}
                                        width={100}
                                        src={message.image}
                                        alt={message.name}
                                        className="object-cover  !m-0 !p-0 object-top rounded-full h-9 w-9 border-2 group-hover:scale-105 group-hover:z-30 border-white relative transition duration-500"
                                    />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
        </div>
    );
}