"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
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
        <span className="text-4xl scroll-m-20 tracking-tight font-extrabold flex justify-center ">Share what you built</span>
        <TypewriterEffectSmooth words={words} />
      </div>
    </div>
  );
}
