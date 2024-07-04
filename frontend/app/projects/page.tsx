"use client";
import * as React from "react";
import ProjectCardSection from "@/components/ui/Project-card-sec";
import MultipleCardsAnimated from "@/components/muli-animated";
import { SparklesPreview } from "@/components/sparkleheading";
import { motion } from "framer-motion";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "@/redux/slices/authSlice";
import { useGetAllProjectMutation } from "@/redux/slices/projectsApiSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";
import withAuth from "@/lib/PrivateRoute";
interface User {
  userId: string;
}

interface Project {
  teamLeaderId: string;
  teamMembers: User[];
  dateCreated: string;
}

function MyComponent() {
  const { projects, userInfo } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const filteredProjects = Array.isArray(projects)
    ? projects.filter((project: Project) =>
        project.teamLeaderId === userInfo.userId ||
        project.teamMembers.some((member: User) => member.userId === userInfo.userId)
      )
    : [];
  const sortedProjects = filteredProjects.sort((a: Project, b: Project) =>
    new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
  );

  const InsideSparkle = () => {
    return <ProjectCardSection />;
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: [20, -5, 0],
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1],
      }}
    >
      <HeroHighlight>
        <ProjectCardSection />
        {sortedProjects.length > 0 && (
          <div>
            <div className="my-8">
              <SparklesPreview>
                <h1 className="text-6xl font-bold text-center relative bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-2">
                  Projects
                </h1>
              </SparklesPreview>
            </div>
            <MultipleCardsAnimated projects={sortedProjects} />
          </div>
        )}
      </HeroHighlight>
    </motion.div>
  );
}

export default withAuth(MyComponent);