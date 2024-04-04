"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { TypewriterEffectSmooth } from "./typewriter-effect";

export default function ProjectHeading() {
  const words = [
    {
      text: "Give",
    },
    {
      text: "your",
    },
    {
      text: "projects",
    },
    {
      text: "a",
    },
    {
      text: "place",
    },
    {
      text: "to",
    },
    {
      text: "breathe and inspire.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="mb-4 w-auto">
      <div className="flex flex-col items-center justify-center h-auto  ">
        {/* <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
                The road to freedom starts from here
            </p> */}
        <span className="text-4xl scroll-m-20 tracking-tight font-extrabold flex justify-center ">Share what you built</span>
        <TypewriterEffectSmooth words={words} />
      </div>
      {/* <span className="text-4xl scroll-m-20 tracking-tight font-extrabold flex justify-center ">Share what you built</span> */}
      {/* <blockquote className="mt-2 mx-2 border-l-2 pl-6 italic">
    Give your weekend projects, side projects, hobby projects, serious ventures a place to breathe, 
    invite collaborators and inspire 
    </blockquote> */}
      {/* <TypewriterEffectSmoothDemo/> */}
    </div>
  );
}
