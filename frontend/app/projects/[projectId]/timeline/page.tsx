"use client";
import { TimelineLayout } from "@/components/usedForProjectPage/timeline-layout";
import withAuth from "@/lib/PrivateRoute";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link"; // Import Link from Next.js

function ProjectTimelinePage({ params }: any) {
  const { currentProject } = useSelector((state: any) => state.auth);

  return (
    <div className="ml-[8rem]">
      <div className="flex flex-col justify-center items-center my-16">
        <Link href="/projects">
          {" "}
          {/* Replace '/projects' with your desired route */}
          <a className="text-blue-500 hover:underline mb-4 block">
            Back to Projects
          </a>
        </Link>
        <TimelineLayout githubLink={currentProject.githubLink} />
      </div>
    </div>
  );
}

export default withAuth(ProjectTimelinePage);
