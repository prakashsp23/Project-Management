"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import TypewriterEffectSmoothDemo from "../typewriter-effect";

export default function ProjectHeading() {
  return (
    <div className="mb-4 w-auto">
      {/* <span className="text-4xl scroll-m-20 tracking-tight font-extrabold flex justify-center ">Share what you built</span> */}
    {/* <blockquote className="mt-2 mx-2 border-l-2 pl-6 italic">
    Give your weekend projects, side projects, hobby projects, serious ventures a place to breathe, 
    invite collaborators and inspire 
    </blockquote> */}
      <TypewriterEffectSmoothDemo/>
    </div>
  );
}
