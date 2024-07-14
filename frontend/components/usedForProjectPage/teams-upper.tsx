"use client";

import { userData } from "@/components/morecomponents/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SynopsisStatusChange from "@/components/usedForProjectPage/synopsisStatusChange";
import { cn } from "@/lib/utils";
import { setCurrentProject } from "@/redux/slices/authSlice";
import { useGetProjectByIdMutation } from "@/redux/slices/projectsApiSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BentoGrid } from "../morecomponents/bento-grid";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import { Button } from "../ui/button";
import { MultiStepLoader } from "../ui/multi-step-loader";
const loadingStates = [
  {
    text: "Fetching Project Details",
  },
  {
    text: "Getting things ready",
  }
];
export default function TeamTop({ projectParams }: any) {
  const { userInfo, projects, currentProject } = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  // const projectDetails = projects.find((p: any) => p.id === projectParams.projectId);
  const [getProjectById, { isLoading: isGettingProject }] = useGetProjectByIdMutation();
  useEffect(() => {
    const fetchProjectById = async () => {
      try {
        const currProjectRes: any = await getProjectById({ id: projectParams.projectId }).unwrap();
        // Handle the project response as needed
        console.log("Project details:", currProjectRes);
        dispatch(setCurrentProject(currProjectRes.project));
      } catch (error: any) {
        // Handle any errors
        console.error("Error fetching project by ID:", error?.data?.message || error.error);
      }
    };

    fetchProjectById();
    // console.log(fetchProjectById);
  }, []);
  if (isGettingProject) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <MultiStepLoader loadingStates={loadingStates} loading={isGettingProject} duration={1000} />
      </div>
    )
  }
  const features = [
    {
      className: " col-span-3 lg:col-span-2",
      background: (
        <ProjectDetailCard projectDetails={currentProject} />
      ),
    },
    {
      className: "col-span-3 lg:col-span-1",
      background: (
        <TeacherDetailCard />
      ),
    },
    {
      className: "col-span-3 lg:col-span-1",
      background: (
        <MemberDetailCard />
      ),
    },
    {

      className: "col-span-3 lg:col-span-2",
      background: (
        <TechnologiesUsedCard projectDetails={currentProject} />
      ),
    },
    {
      className: "col-span-3 lg:col-span-2",
      background: (
        // <div>hii3</div>
        <GithubCommitCard projectDetails={currentProject} />
      ),
    },
    {
      className: "col-span-3 lg:col-span-1",
      background: (
        <SynopsisDetailCard projectDetails={currentProject} />
      ),
    },

  ];
  return currentProject ? (
    <div className="h-auto py-8 px-24">
      <BentoGrid className="auto-rows-[17rem]">
        {features.map((feature, idx) => (
          <BentoCardExperiment key={idx} {...feature} />
        ))}
      </BentoGrid>
    </div>
  ) : (
    <></>
  );
}
function ProjectDetailCard({ projectDetails }: any) {
  return (
    <Card className=" p-2">
      <CardHeader>
        <CardTitle>{projectDetails.title}</CardTitle>
        <CardDescription>{projectDetails.description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
function MemberDetailCard() {
  return (
    <Card className="p-2 ">
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>Team working on the project</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-6">
        <AnimatedTooltip items={userData} />
        {/* {projectDetails.teamMembers}
              {projectDetails.teamLeaderId} */}
      </CardContent>
    </Card>
  )
}
function TeacherDetailCard() {
  return (
    <Card className="p-2 ">
      <CardHeader>
        <CardTitle>Teachers/Mentors</CardTitle>
        <CardDescription>Instructors guiding the project</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row gap-6 ">
        <AnimatedTooltip items={userData} />
      </CardContent>
    </Card>
  )
}
function GithubCommitCard({ projectDetails }: any) {
  return (
    <Card className="w-full grid items-center bg-transparent p-6 ">
      <div className="space-y-4">
        <div className="">
          <h2 className="font-semibold leading-none tracking-tight">GitHub Repository</h2>
          <p className="text-sm text-muted-foreground">View the project's code on GitHub</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold leading-none tracking-tight">Commits</h3>
            <p className="text-sm text-muted-foreground">Last updated 3 minutes ago</p>
          </div>
          <div className="flex items-center">
            {/* <span className="text-2xl font-bold">423</span> */}
            <Link href={`/projects/${projectDetails.id}/timeline`}>
              <Button variant="default" className="ml-4">
                View Timeline
              </Button>
            </Link>
          </div>
        </div>
        <Link href={projectDetails.githubLink}>
          <Button variant="outline" className="w-full mt-6">
            View Repository
          </Button>
        </Link>
      </div>
    </Card>
  )
}

function TechnologiesUsedCard({ projectDetails }: any) {
  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle>Tech Stack</CardTitle>
        <CardDescription>
          Technologies used in this project
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="list-disc pl-4">
          {projectDetails.technologiesUsed.map(
            (item: any, index: number) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>
      </CardContent>
    </Card>
  )
}
function SynopsisDetailCard({ projectDetails }: any) {
  const { userInfo, userType } = useSelector((state: any) => state.auth);
  const isteacher = userType === "teacher";
  return (
    <Card className="w-full grid items-center max-w-md bg-card text-card-foreground p-6 rounded-lg shadow-lg">
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold leading-none tracking-tight">Synopsis</h2>
          {/* <p className="text-sm text-muted-foreground">Status</p> */}
        </div>
        <div className="flex items-center justify-between">
          <div>
            {/* <h3 className="font-semibold leading-none tracking-tight">Commits</h3> */}
            <p className="text-sm text-muted-foreground">Status:</p>
          </div>
          <div className="flex items-center flex-col">

            <span className="text-sm">{projectDetails.status}</span>

          </div>

        </div>
        <div className="space-y-4">
          <Link href={`/projects/${projectDetails.id}/synopsis`}>
            <Button variant="outline" className="w-full mt-6">
              View Synopsis
            </Button>
          </Link>
          {isteacher && <SynopsisStatusChange projectId={projectDetails.id} />}
        </div>
      </div>
    </Card>
  )
}
export function BentoCardExperiment({ background, className }: any) {
  return (
    <div
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
        // light styles
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        // dark styles
        "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
        className,
      )}
    >
      <div className="p-8">
        {background}
      </div>
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10 " />
    </div>
  )
}
