import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { AnimatedTooltip } from "./ui/animated-tooltip"; // Corrected import
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { cardData, CardData } from "./cardData";
import Link from "next/link";

export default function MultipleCardsAnimated(projects: any) {
  const items = Array(projects?.projects);
  console.log(projects);
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3">
        {Array.isArray(projects?.projects) &&
          projects?.projects.length !== 0 &&
          projects?.projects?.map((project: any, index: number) => (
            // <Link key={index} href={`/${data.title.toLowerCase().replace(/\s/g, '-')}`}>
            <SingleCard key={index} data={project} />
            // </Link>
          ))}
      </div>
    </div>
  );
}

function SingleCard(project: any) {
  return (
    <div className="mx-4 my-8 ">
      <div className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2] max-w-sm w-full  relative h-auto">
        <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
        <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
        <Link
          href={`/${project?.data.title.toLowerCase().replace(/\s/g, "-")}`}
        >
          <Card className="w-[22rem] max-w-sm h-[25rem] relative">
            <CardHeader className="flex flex-row items-center">
              <div className="space-y-1.5">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {/* [Semester: {project?.semester}] */}
                </p>
                <CardTitle>{project?.data.title}</CardTitle>
              </div>
              <div className="flex items-center justify-center ml-auto mx-4">
                {/* <AnimatedTooltip
                  items={project?.data.teamMembers[0].username}
                /> */}
              </div>
            </CardHeader>
            <CardContent className="grid gap-2 absolute inset-x-0 bottom-0">
              <p className="text-sm text-wrap">{project?.data.description}</p>
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
                    <Button variant="link" className="w-32">
                      @Technologies
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80">
                    <div className="flex justify-between space-x-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap gap-2">
                          {project?.data.technologiesUsed.map(
                            (tech: any, index: number) => (
                              // <Badge className="text-xs inline-flex p-2 animate-shimmer items-center justify-center rounded-md border border-slate-800 dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[linear-gradient(110deg,#ffffff,45%,#e6e8e9,55%,#ffffff)] text-dark dark:text-white bg-[length:200%_100%] transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50" key={index}>{tech}</Badge>
                              <Badge
                                variant={"nonhover"}
                                className="text-xs px-4 py-0.5  border-2 border-black dark:border-white uppercase bg-white dark:bg-black text-black dark:text-white shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_0px_0px_rgba(255,255,255)] "
                                key={index}
                              >
                                {tech}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>
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
