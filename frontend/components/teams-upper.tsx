"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import { userData } from "@/components/data";
import { CardsMetric } from "@/components/git-line";
import { GithubCard } from "@/components/github-card";
import { AnimatedTooltip } from "./ui/animated-tooltip";
import { useSelector } from "react-redux";

export default function TeamTop() {
  const { userInfo, projects } = useSelector((state: any) => state.auth);
  const filteredProjects: any = projects?.filter(
    (project: any) => project.teamLeaderId === userInfo.userId
  );

  // Find the project with the latest dateCreated
  const latestProject: any | undefined = filteredProjects?.reduce(
    (prev: any | undefined, current: any) => {
      if (!prev) return current;
      const prevDate: Date = new Date(prev.dateCreated);
      const currentDate: Date = new Date(current.dateCreated);
      // Return the project with the later dateCreated
      return prevDate > currentDate ? prev : current;
    },
    undefined // Start with undefined as initial value
  );

  console.log(latestProject);

  return latestProject ? (
    <div className="h-auto py-8">
      <div className="grid grid-cols-6 grid-rows-2 gap-4">
        <div className="flex flex-col col-span-2 row-span-2 gap-2 ml-8">
          <Card className=" p-2">
            <CardHeader>
              <CardTitle>{latestProject.title}</CardTitle>
              <CardDescription>{latestProject.description}</CardDescription>
            </CardHeader>
          </Card>
          <Card className="p-2 ">
            <CardHeader>
              <CardTitle>Members</CardTitle>
              <CardDescription>Team working on the project</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-row gap-6">
              <AnimatedTooltip items={userData} />
            </CardContent>
          </Card>
          <Card className="p-2 ">
            <CardHeader>
              <CardTitle>Teachers/Mentors</CardTitle>
              <CardDescription>Instructors guiding the project</CardDescription>
            </CardHeader>
            {/* {userData.map((member, index) => (
                            <UserCard
                                key={index}
                                name={member.name}
                                imageUrl={member.image}
                                altText=""
                            />
                        ))} */}
            <CardContent className="flex flex-row gap-6 ">
              <AnimatedTooltip items={userData} />
            </CardContent>
          </Card>
        </div>
        {/* <Card className="col-span-3 row-span-5 col-start-3 h-[40rem] row-start-1 border-2 rounded-lg max-w-5xl">
                    <Chat
                        selectedUser={selectedUser}
                        isMobile={isMobile}
                    />
                </Card> */}
        <div className="flex flex-row col-span-4  gap-6 ">
          {/* <div className="w-[30rem]"><GithubCard/></div> */}
          <GithubCard />
          <Card className="w-[30rem]">
            <CardHeader>
              <CardTitle>Tech Stack</CardTitle>
              <CardDescription>
                Technologies used in this project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4">
                {latestProject.technologiesUsed.map(
                  (item: any, index: number) => (
                    <li key={index}>{item}</li>
                  )
                )}
              </ul>
            </CardContent>
          </Card>
        </div>
        {/* <div className="col-span-2">
                <GithubCard/>
                </div> */}
        <div className="col-span-4">
          <CardsMetric />
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
