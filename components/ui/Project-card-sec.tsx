"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { BackgroundBeams } from "@/components/ui/background-beams";
import ProjectHeading from "@/components/ui/project-heading";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import NewProjectCard from "@/components/ui/add-new-project-sec";
export default function ProjectCardSection() {
  return (
    <div>
      {/* <div className="mb-4"><ProjectHeading /></div> */}
      <ProjectHeading />
      {/* <div className="h-[35rem] w-full dark:bg-[#09090b] bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      
      <BackgroundBeams />
    </div> */}
      <div className="flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Create your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <Card className="p-8 m-4">
              {/* <Skeleton className="w-[100px] h-[20px] rounded-full" /> */}
              <div className="flex flex-col space-y-2  items-center">
                <Skeleton className="h-[70px] w-[150px] rounded-xl" />
                <div className="space-y-2">
                  <div className="flex justify-center items-center font-semibold">Add New Project</div>
                  <NewProjectCard />
                  <Skeleton className="h-4 w-[150px]" />
                  {/* <Skeleton className="h-[50px] w-[150px] rounded-xl" /> */}
                  <div className="grid grid-cols-3 px-">
                    <Skeleton className="h-4 w-[40px] grid-cols-2 " />
                    <Skeleton className="h-4 w-[15px] grid-cols-1" />
                  </div>
                </div>
              </div>
            </Card>

          </CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button> */}
          </CardFooter>
        </Card>
      </div>
    </div>

  );
}

// h-[40rem] w-full rounded-md  relative flex flex-col items-center justify-center antialiased