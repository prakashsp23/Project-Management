import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { AnimatedTooltip } from "./ui/animated-tooltip"; // Corrected import
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { cardData, CardData } from "./cardData";
import Link from "next/link";


export default function MultipleCardsAnimated() {
    return (
        <div className="grid grid-cols-3">
                {cardData.map((data, index) => (
                    <Link key={index} href={`/${data.title.toLowerCase().replace(/\s/g, '-')}`}>
                    <SingleCard key={index} {...data} />
                    </Link>
                ))}
        </div>

    );
}

function SingleCard({ title, description, semester, people, technologies }: CardData) {
    return (
        <div className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full m-16 relative h-auto">
            <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
            <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
            <Card className="w-full max-w-sm h-96 relative">
                <CardHeader className="flex flex-row items-center">

                    <div className="space-y-1.5">
                        <p className="text-xs text-gray-500 dark:text-gray-400">[Semester: {semester}]</p>
                        <CardTitle>{title}</CardTitle>
                    </div>
                    <div className="flex items-center justify-center ml-auto mx-4">
                        <AnimatedTooltip items={people} />
                    </div>
                </CardHeader>
                <CardContent className="grid gap-2 absolute inset-x-0 bottom-0">
                    <p className="text-sm text-wrap">{description}</p>
                    {/* <p className="text-xs text-gray-500 dark:text-gray-400">Technologies:</p>
                    <div className="flex flex-wrap gap-2">
                        {technologies.map((tech, index) => (
                            <Badge className="text-xs inline-flex p-2 animate-shimmer items-center justify-center rounded-md border border-slate-800 dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[linear-gradient(110deg,#ffffff,45%,#e6e8e9,55%,#ffffff)] text-dark dark:text-white bg-[length:200%_100%] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" key={index}>{tech}</Badge>
                            // <Badge variant={"nonhover"} className="text-xs px-4 py-0.5  border-2 border-black dark:border-white uppercase bg-white dark:bg-black text-black dark:text-white shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] " key={index}>{tech}</Badge>
                        ))}
                    </div> */}
                    <div className="flex justify-center items-center">
                        <HoverCard>
                            <HoverCardTrigger asChild>
                                <Button variant="link" className="w-32">@Technologies</Button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                                <div className="flex justify-between space-x-4">
                                    <div className="space-y-1">
                                        <div className="flex flex-wrap gap-2">
                                            {technologies.map((tech, index) => (
                                                // <Badge className="text-xs inline-flex p-2 animate-shimmer items-center justify-center rounded-md border border-slate-800 dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[linear-gradient(110deg,#ffffff,45%,#e6e8e9,55%,#ffffff)] text-dark dark:text-white bg-[length:200%_100%] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" key={index}>{tech}</Badge>
                                                <Badge variant={"nonhover"} className="text-xs px-4 py-0.5  border-2 border-black dark:border-white uppercase bg-white dark:bg-black text-black dark:text-white shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_0px_0px_rgba(255,255,255)] " key={index}>{tech}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export const Icon = ({ className, ...rest }: React.SVGProps<SVGSVGElement>) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className={className}
            {...rest}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
        </svg>
    );
};
