import Image from "next/image";
import { UserCard } from "../member-teacher";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

interface SidebarProps {
    isCollapsed: boolean;
    members: {
        name: string;
        image: string;
    }[];
    onClick?: () => void;
    isMobile: boolean;
}

export function Sidebar({ members, isCollapsed, isMobile }: SidebarProps) {
    return (
        <div
            data-collapsed={isCollapsed}
            className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
        >
            {!isCollapsed && (
                <div className="flex justify-between p-2 items-center">
                    <div className="flex gap-2 items-center text-lg">
                        <p className="font-semibold">Members</p>
                    </div>
                </div>
            )}
            <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
                {members.map((member, index) => (
                    <MemberLink key={index} member={member} isCollapsed={isCollapsed} />
                ))}
            </nav>
        </div>
    );
}

const MemberLink = ({ member, isCollapsed }: { member: any; isCollapsed: boolean }) => {
    const { name, image } = member;

    if (isCollapsed) {
        return (
            <TooltipImage name={name} image={image}/>
        );
    } else {
        return (
            <UserCard
            name={name}
            imageUrl={image}
            altText=""
            />
        );
    }
};

const TooltipImage = ({ image, name }:any) => {
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                    <div>
                        <Image
                            height={100}
                            width={100}
                            src={image}
                            alt={image}
                            className="object-cover !m-0 !p-0 object-top rounded-full h-9 w-9 border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500"
                        />
                    </div>
                </TooltipTrigger>
                <TooltipContent
                    side="right"
                    className="flex items-center gap-4"
                >
                    {name}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}