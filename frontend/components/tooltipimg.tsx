import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import Image from "next/image";
interface ToottipProps {
    name: string;
    image: string;
    designation:string;
};
export function TooltipImage({ image, name,designation }:ToottipProps){
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
                    // side="right"
                    // className="flex items-center gap-4"
                >
                    {name}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}