"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProjectHeading from "@/components/usedForProjectPage/project-heading";
import { Skeleton } from "@/components/ui/skeleton";
import { CirclePlus } from "lucide-react";
import Link from "next/link";
export default function ProjectCardSection() {
  return (
    <div className="mb-24 mt-4">
      <ProjectHeading />
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
                  {/* <NewProjectCard /> */}
                  <div className="flex justify-center items-center">
                    <Link href="/synopsis">
                      <Button variant="outline" className="">
                        <CirclePlus />
                      </Button>
                    </Link>
                  </div>

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